#!/usr/bin/env python3
"""
Analyze Git Changes for Test Plan Generation

Analyzes git diff to determine what types of tests are needed.
Framework-agnostic: works with any project structure.

Usage:
    python analyze_changes.py [base-branch]
    python analyze_changes.py main
    python analyze_changes.py develop

Output: JSON with test recommendations
"""

import sys
import subprocess
import json
import re
from typing import Dict, List, Any
from pathlib import Path

class ChangeAnalyzer:
    def __init__(self, base_branch: str = "main"):
        self.base_branch = base_branch
        self.changed_files = []
        self.analysis = {
            "summary": {
                "total_files": 0,
                "backend_files": 0,
                "frontend_files": 0,
                "database_files": 0,
                "test_files": 0
            },
            "recommendations": {
                "e2e_tests": [],
                "api_tests": [],
                "unit_tests": [],
                "integration_tests": [],
                "performance_tests": []
            },
            "changed_files": []
        }

    def analyze(self) -> Dict[str, Any]:
        """Analyze changes and generate test recommendations."""
        self._get_changed_files()
        self._categorize_files()
        self._generate_recommendations()
        return self.analysis

    def _get_changed_files(self):
        """Get list of changed files from git diff."""
        try:
            # Get changed files
            result = subprocess.run(
                ["git", "diff", f"{self.base_branch}...HEAD", "--name-only"],
                capture_output=True,
                text=True,
                check=True
            )
            self.changed_files = [f for f in result.stdout.strip().split('\n') if f]
            self.analysis["summary"]["total_files"] = len(self.changed_files)
            self.analysis["changed_files"] = self.changed_files
        except subprocess.CalledProcessError as e:
            print(f"Error getting changed files: {e}", file=sys.stderr)
            sys.exit(1)

    def _categorize_files(self):
        """Categorize files by type."""
        for file_path in self.changed_files:
            path = Path(file_path)

            # Categorize
            if self._is_test_file(file_path):
                self.analysis["summary"]["test_files"] += 1
            elif self._is_backend_file(file_path):
                self.analysis["summary"]["backend_files"] += 1
            elif self._is_frontend_file(file_path):
                self.analysis["summary"]["frontend_files"] += 1
            elif self._is_database_file(file_path):
                self.analysis["summary"]["database_files"] += 1

    def _is_test_file(self, path: str) -> bool:
        """Check if file is a test file."""
        test_patterns = [
            r'\.test\.',
            r'\.spec\.',
            r'Test\.cs$',
            r'Tests\.cs$',
            r'^tests?/',
            r'/__tests__/',
            r'/test_',
            r'_test\.py$'
        ]
        return any(re.search(pattern, path, re.IGNORECASE) for pattern in test_patterns)

    def _is_backend_file(self, path: str) -> bool:
        """Check if file is a backend file."""
        backend_patterns = [
            r'\.cs$',  # C#
            r'backend/',
            r'server/',
            r'api/',
            r'src/.*Controller',
            r'src/.*Service',
            r'\.go$',  # Go
            r'main\.py$',  # Python
            r'app\.py$',
            r'__init__\.py$'
        ]
        return any(re.search(pattern, path, re.IGNORECASE) for pattern in backend_patterns)

    def _is_frontend_file(self, path: str) -> bool:
        """Check if file is a frontend file."""
        frontend_patterns = [
            r'\.tsx?$',  # TypeScript/React
            r'\.jsx?$',  # JavaScript/React
            r'\.vue$',  # Vue
            r'\.svelte$',  # Svelte
            r'components/',
            r'pages/',
            r'views/',
            r'src/.*\.(css|scss|less)$'
        ]
        return any(re.search(pattern, path, re.IGNORECASE) for pattern in frontend_patterns)

    def _is_database_file(self, path: str) -> bool:
        """Check if file is a database-related file."""
        db_patterns = [
            r'migrations?/',
            r'\.sql$',
            r'schema',
            r'Entities/',
            r'Models/',
            r'Domain/'
        ]
        return any(re.search(pattern, path, re.IGNORECASE) for pattern in db_patterns)

    def _generate_recommendations(self):
        """Generate test recommendations based on changes."""
        has_backend = self.analysis["summary"]["backend_files"] > 0
        has_frontend = self.analysis["summary"]["frontend_files"] > 0
        has_database = self.analysis["summary"]["database_files"] > 0

        # E2E Tests
        if has_frontend or self._has_user_facing_changes():
            self.analysis["recommendations"]["e2e_tests"].append({
                "reason": "User-facing changes detected",
                "priority": "high",
                "description": "Test complete user workflows through UI"
            })

        # API Tests
        if has_backend and self._has_api_changes():
            # Only recommend if not fully covered by E2E
            if not has_frontend:
                self.analysis["recommendations"]["api_tests"].append({
                    "reason": "Backend API changes without frontend changes",
                    "priority": "high",
                    "description": "Test API endpoints directly (not covered by E2E)"
                })
            else:
                self.analysis["recommendations"]["api_tests"].append({
                    "reason": "API edge cases not testable via UI",
                    "priority": "medium",
                    "description": "Test error scenarios, edge cases, malformed requests"
                })

        # Unit Tests
        if self._has_complex_logic():
            self.analysis["recommendations"]["unit_tests"].append({
                "reason": "Complex business logic detected",
                "priority": "medium",
                "description": "Test algorithms, calculations, validation logic in isolation"
            })

        # Integration Tests
        if has_database or self._has_external_integrations():
            self.analysis["recommendations"]["integration_tests"].append({
                "reason": "Database or external service integration",
                "priority": "medium",
                "description": "Test interactions between components and external systems"
            })

        # Performance Tests
        if self._is_performance_critical():
            self.analysis["recommendations"]["performance_tests"].append({
                "reason": "Performance-critical changes detected",
                "priority": "low",
                "description": "Test response times, throughput, resource usage"
            })

    def _has_user_facing_changes(self) -> bool:
        """Check if changes are user-facing."""
        user_facing_patterns = [
            r'pages/',
            r'components/',
            r'views/',
            r'Controller\.cs$',
            r'routes'
        ]
        return any(
            any(re.search(pattern, f, re.IGNORECASE) for pattern in user_facing_patterns)
            for f in self.changed_files
        )

    def _has_api_changes(self) -> bool:
        """Check if API endpoints were added/modified."""
        api_patterns = [
            r'Controller',
            r'api/',
            r'routes',
            r'endpoints'
        ]
        return any(
            any(re.search(pattern, f, re.IGNORECASE) for pattern in api_patterns)
            for f in self.changed_files
        )

    def _has_complex_logic(self) -> bool:
        """Check if complex business logic was added."""
        logic_patterns = [
            r'Service',
            r'Validator',
            r'Helper',
            r'Utils',
            r'Algorithm'
        ]
        return any(
            any(re.search(pattern, f, re.IGNORECASE) for pattern in logic_patterns)
            for f in self.changed_files
        )

    def _has_external_integrations(self) -> bool:
        """Check if external service integrations were added."""
        integration_patterns = [
            r'Integration',
            r'Client',
            r'Api',
            r'External'
        ]
        return any(
            any(re.search(pattern, f, re.IGNORECASE) for pattern in integration_patterns)
            for f in self.changed_files
        )

    def _is_performance_critical(self) -> bool:
        """Check if changes are performance-critical."""
        perf_patterns = [
            r'Query',
            r'Database',
            r'Cache',
            r'Optimize',
            r'Performance'
        ]
        return any(
            any(re.search(pattern, f, re.IGNORECASE) for pattern in perf_patterns)
            for f in self.changed_files
        )

def main():
    base_branch = sys.argv[1] if len(sys.argv) > 1 else "main"

    analyzer = ChangeAnalyzer(base_branch)
    analysis = analyzer.analyze()

    # Output as JSON
    print(json.dumps(analysis, indent=2))

if __name__ == "__main__":
    main()
