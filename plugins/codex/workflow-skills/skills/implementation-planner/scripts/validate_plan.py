#!/usr/bin/env python3
"""
Implementation Plan Validator

Validates the structure and completeness of implementation plans.
Framework-agnostic: works with any project type.

Usage:
    python validate_plan.py <plan-file.md>

Example:
    python validate_plan.py Plan.md
    python validate_plan.py implementation-plan.md
"""

import sys
import re
from pathlib import Path
from typing import List, Tuple

class PlanValidator:
    def __init__(self, plan_path: str):
        self.plan_path = Path(plan_path)
        self.errors: List[str] = []
        self.warnings: List[str] = []
        self.content = ""

    def validate(self) -> bool:
        """Validate the plan file. Returns True if valid, False otherwise."""
        if not self.plan_path.exists():
            self.errors.append(f"Plan file not found: {self.plan_path}")
            return False

        self.content = self.plan_path.read_text(encoding='utf-8')

        # Run all validation checks
        self._check_has_title()
        self._check_has_overview()
        self._check_has_progress_tracker()
        self._check_has_phases()
        self._check_checkboxes_format()
        self._check_validation_criteria()
        self._check_dependencies_marked()
        self._check_phase_structure()

        return len(self.errors) == 0

    def _check_has_title(self):
        """Check if plan has a title."""
        if not re.search(r'^#\s+.+', self.content, re.MULTILINE):
            self.errors.append("Missing plan title (should start with # Title)")

    def _check_has_overview(self):
        """Check if plan has an overview or description section."""
        overview_patterns = [
            r'##\s+Overview',
            r'##\s+Description',
            r'##\s+Vue d\'ensemble'  # French variant
        ]
        if not any(re.search(pattern, self.content, re.IGNORECASE) for pattern in overview_patterns):
            self.warnings.append("Consider adding an Overview/Description section")

    def _check_has_progress_tracker(self):
        """Check if plan has a progress tracking section."""
        progress_patterns = [
            r'##\s+Progress',
            r'##\s+État d\'Avancement',  # French variant
            r'##\s+Status'
        ]
        if not any(re.search(pattern, self.content, re.IGNORECASE) for pattern in progress_patterns):
            self.warnings.append("Consider adding a Progress Tracker section")

    def _check_has_phases(self):
        """Check if plan has phase sections."""
        phases = re.findall(r'^##\s+(Phase|Step|Étape)\s+\d+', self.content, re.MULTILINE | re.IGNORECASE)
        if not phases:
            self.errors.append("No phases found. Plan should have phases/steps (e.g., '## Phase 1: ...')")
        elif len(phases) == 1:
            self.warnings.append("Only one phase found. Consider breaking down into multiple phases.")

    def _check_checkboxes_format(self):
        """Check if checkboxes are properly formatted."""
        lines = self.content.split('\n')

        for i, line in enumerate(lines, 1):
            # Check for malformed checkboxes
            if '[]' in line and not re.match(r'^\s*-\s+\[[x ]\]', line):
                self.errors.append(f"Line {i}: Malformed checkbox. Use '- [ ]' or '- [x]' format")

            # Check for checkboxes without task description
            if re.match(r'^\s*-\s+\[[x ]\]\s*$', line):
                self.errors.append(f"Line {i}: Checkbox without description")

        # Check if plan has any checkboxes
        if not re.search(r'-\s+\[[x ]\]', self.content):
            self.errors.append("No checkboxes found. Implementation plan should use checkboxes for tracking.")

    def _check_validation_criteria(self):
        """Check if phases have validation criteria."""
        phases = re.findall(r'^##\s+(Phase|Step|Étape)\s+\d+:?\s+.+$', self.content, re.MULTILINE | re.IGNORECASE)

        if phases:
            # Look for validation/success criteria sections
            criteria_patterns = [
                r'###\s+(Validation|Success|Acceptance)\s+Criteria',
                r'###\s+Critères\s+de\s+(Validation|Succès)',  # French
                r'##\s+(Validation|Success|Acceptance)\s+Criteria'
            ]

            criteria_found = any(re.search(pattern, self.content, re.IGNORECASE) for pattern in criteria_patterns)

            if not criteria_found:
                self.warnings.append("No validation criteria found. Consider adding success criteria for phases.")

    def _check_dependencies_marked(self):
        """Check if dependencies are marked where appropriate."""
        # Look for dependency markers
        dependency_patterns = [
            r'Depends\s+on',
            r'Dependencies',
            r'Dépendances',  # French
            r'Requires',
            r'Blocked\s+by'
        ]

        phases = re.findall(r'^##\s+(Phase|Step|Étape)\s+\d+', self.content, re.MULTILINE | re.IGNORECASE)

        if len(phases) > 1:  # Only check if there are multiple phases
            dependency_found = any(re.search(pattern, self.content, re.IGNORECASE) for pattern in dependency_patterns)

            if not dependency_found:
                self.warnings.append("No dependencies marked. Consider documenting dependencies between phases/steps.")

    def _check_phase_structure(self):
        """Check if phases have proper structure."""
        # Split content into phases
        phase_pattern = r'^##\s+(Phase|Step|Étape)\s+\d+.*?(?=^##\s+(?:Phase|Step|Étape)\s+\d+|$)'
        phases = re.findall(phase_pattern, self.content, re.MULTILINE | re.DOTALL | re.IGNORECASE)

        if phases:
            for i, phase in enumerate(phases, 1):
                # Check if phase has any checkboxes
                if not re.search(r'-\s+\[[x ]\]', phase):
                    self.warnings.append(f"Phase {i}: No checkboxes found. Add task checkboxes to track progress.")

                # Check if phase has description/goals
                if len(phase.strip()) < 100:  # Arbitrary minimum length
                    self.warnings.append(f"Phase {i}: Phase description seems very short. Consider adding more detail.")

    def print_results(self):
        """Print validation results."""
        print(f"\n{'='*70}")
        print(f"Plan Validation Results: {self.plan_path.name}")
        print(f"{'='*70}\n")

        if not self.errors and not self.warnings:
            print("✅ Plan is valid! No errors or warnings found.\n")
            return

        if self.errors:
            print(f"❌ ERRORS ({len(self.errors)}):\n")
            for error in self.errors:
                print(f"  • {error}")
            print()

        if self.warnings:
            print(f"⚠️  WARNINGS ({len(self.warnings)}):\n")
            for warning in self.warnings:
                print(f"  • {warning}")
            print()

        if not self.errors:
            print("✅ No errors found. Plan structure is valid.\n")
        else:
            print("❌ Please fix errors before proceeding.\n")

        print(f"{'='*70}\n")

def main():
    if len(sys.argv) != 2:
        print("Usage: python validate_plan.py <plan-file.md>")
        print("\nExample:")
        print("  python validate_plan.py Plan.md")
        print("  python validate_plan.py implementation-plan.md")
        sys.exit(1)

    plan_path = sys.argv[1]
    validator = PlanValidator(plan_path)

    is_valid = validator.validate()
    validator.print_results()

    # Exit with error code if validation failed
    sys.exit(0 if is_valid else 1)

if __name__ == "__main__":
    main()
