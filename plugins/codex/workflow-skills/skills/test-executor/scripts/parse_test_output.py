#!/usr/bin/env python3
"""
Test Output Parser

Parses test output from various testing frameworks into structured format.
Framework-agnostic: supports Jest, pytest, dotnet test, Go test, Cargo test, etc.

Usage:
    python parse_test_output.py <test-output-file>
    cat test-output.txt | python parse_test_output.py

Output: JSON with parsed test results
"""

import sys
import re
import json
from typing import Dict, List, Any, Optional
from pathlib import Path

class TestOutputParser:
    def __init__(self, output: str):
        self.output = output
        self.results = {
            "framework": "unknown",
            "summary": {
                "total": 0,
                "passed": 0,
                "failed": 0,
                "skipped": 0,
                "duration": None
            },
            "tests": []
        }

    def parse(self) -> Dict[str, Any]:
        """Parse test output and return structured results."""
        # Detect framework
        self.results["framework"] = self._detect_framework()

        # Parse based on framework
        if self.results["framework"] == "jest":
            self._parse_jest()
        elif self.results["framework"] == "pytest":
            self._parse_pytest()
        elif self.results["framework"] == "dotnet":
            self._parse_dotnet()
        elif self.results["framework"] == "go":
            self._parse_go()
        elif self.results["framework"] == "cargo":
            self._parse_cargo()
        elif self.results["framework"] == "vitest":
            self._parse_vitest()
        elif self.results["framework"] == "playwright":
            self._parse_playwright()
        else:
            self._parse_generic()

        return self.results

    def _detect_framework(self) -> str:
        """Detect testing framework from output."""
        output_lower = self.output.lower()

        if "jest" in output_lower or "test suites:" in output_lower:
            return "jest"
        elif "pytest" in output_lower or "passed in" in output_lower and "s ====" in output_lower:
            return "pytest"
        elif "passed!" in output_lower and "failed:" in output_lower and "duration:" in output_lower:
            return "dotnet"
        elif "go test" in output_lower or "--- pass:" in output_lower or "--- fail:" in output_lower:
            return "go"
        elif "cargo test" in output_lower or "test result:" in output_lower:
            return "cargo"
        elif "vitest" in output_lower:
            return "vitest"
        elif "playwright" in output_lower or "@playwright/test" in output_lower:
            return "playwright"
        else:
            return "unknown"

    def _parse_jest(self):
        """Parse Jest/Vitest output."""
        # Summary line: "Test Suites: 1 passed, 1 total"
        summary_match = re.search(
            r'Test Suites:\s*(?:(\d+)\s+failed,\s*)?(?:(\d+)\s+passed,\s*)?(\d+)\s+total',
            self.output
        )
        if summary_match:
            failed_suites = int(summary_match.group(1) or 0)
            passed_suites = int(summary_match.group(2) or 0)

        # Tests line: "Tests: 2 passed, 2 total"
        tests_match = re.search(
            r'Tests:\s*(?:(\d+)\s+failed,\s*)?(?:(\d+)\s+passed,\s*)?(?:(\d+)\s+skipped,\s*)?(\d+)\s+total',
            self.output
        )
        if tests_match:
            self.results["summary"]["failed"] = int(tests_match.group(1) or 0)
            self.results["summary"]["passed"] = int(tests_match.group(2) or 0)
            self.results["summary"]["skipped"] = int(tests_match.group(3) or 0)
            self.results["summary"]["total"] = int(tests_match.group(4))

        # Duration: "Time: 2.5 s"
        duration_match = re.search(r'Time:\s*([\d.]+)\s*s', self.output)
        if duration_match:
            self.results["summary"]["duration"] = f"{duration_match.group(1)}s"

        # Individual tests: "✓ test name (45 ms)"
        test_pattern = r'([✓✗])\s+(.+?)\s+\((\d+)\s*ms\)'
        for match in re.finditer(test_pattern, self.output):
            status = "passed" if match.group(1) == "✓" else "failed"
            self.results["tests"].append({
                "name": match.group(2).strip(),
                "status": status,
                "duration": f"{match.group(3)}ms"
            })

    def _parse_pytest(self):
        """Parse pytest output."""
        # Summary: "5 passed, 2 failed in 3.42s"
        summary_match = re.search(
            r'(?:(\d+)\s+failed,?\s*)?(?:(\d+)\s+passed,?\s*)?(?:(\d+)\s+skipped,?\s*)?in\s+([\d.]+)s',
            self.output
        )
        if summary_match:
            self.results["summary"]["failed"] = int(summary_match.group(1) or 0)
            self.results["summary"]["passed"] = int(summary_match.group(2) or 0)
            self.results["summary"]["skipped"] = int(summary_match.group(3) or 0)
            self.results["summary"]["total"] = (
                self.results["summary"]["failed"] +
                self.results["summary"]["passed"] +
                self.results["summary"]["skipped"]
            )
            self.results["summary"]["duration"] = f"{summary_match.group(4)}s"

        # Individual tests: "tests/test_file.py::test_function PASSED"
        test_pattern = r'([\w/\\.]+\.py)::([\w_]+)\s+(PASSED|FAILED|SKIPPED)'
        for match in re.finditer(test_pattern, self.output):
            self.results["tests"].append({
                "name": f"{match.group(1)}::{match.group(2)}",
                "status": match.group(3).lower(),
                "duration": None
            })

    def _parse_dotnet(self):
        """Parse dotnet test output."""
        # Summary: "Passed! - Failed: 0, Passed: 10, Skipped: 0, Total: 10, Duration: 2 s"
        summary_match = re.search(
            r'Failed:\s*(\d+),\s*Passed:\s*(\d+),\s*Skipped:\s*(\d+),\s*Total:\s*(\d+),\s*Duration:\s*([\d.]+)\s*s',
            self.output
        )
        if summary_match:
            self.results["summary"]["failed"] = int(summary_match.group(1))
            self.results["summary"]["passed"] = int(summary_match.group(2))
            self.results["summary"]["skipped"] = int(summary_match.group(3))
            self.results["summary"]["total"] = int(summary_match.group(4))
            self.results["summary"]["duration"] = f"{summary_match.group(5)}s"

        # Individual tests: "Passed TestName"
        test_pattern = r'(Passed|Failed|Skipped)\s+([\w\.]+)'
        for match in re.finditer(test_pattern, self.output):
            self.results["tests"].append({
                "name": match.group(2),
                "status": match.group(1).lower(),
                "duration": None
            })

    def _parse_go(self):
        """Parse Go test output."""
        # Summary: "PASS" or "FAIL"
        if "PASS" in self.output and "FAIL" not in self.output:
            # All passed
            pass

        # Individual tests: "--- PASS: TestName (0.00s)"
        test_pattern = r'---\s+(PASS|FAIL):\s+([\w]+)\s+\(([\d.]+)s\)'
        for match in re.finditer(test_pattern, self.output):
            status = "passed" if match.group(1) == "PASS" else "failed"
            self.results["tests"].append({
                "name": match.group(2),
                "status": status,
                "duration": f"{match.group(3)}s"
            })

            if status == "passed":
                self.results["summary"]["passed"] += 1
            else:
                self.results["summary"]["failed"] += 1

        self.results["summary"]["total"] = len(self.results["tests"])

        # Duration: "ok  	package	0.123s"
        duration_match = re.search(r'ok\s+[\w/]+\s+([\d.]+)s', self.output)
        if duration_match:
            self.results["summary"]["duration"] = f"{duration_match.group(1)}s"

    def _parse_cargo(self):
        """Parse Cargo test output."""
        # Summary: "test result: ok. 5 passed; 0 failed; 0 ignored; 0 measured"
        summary_match = re.search(
            r'test result:.*?(\d+)\s+passed;\s*(\d+)\s+failed;\s*(\d+)\s+ignored',
            self.output
        )
        if summary_match:
            self.results["summary"]["passed"] = int(summary_match.group(1))
            self.results["summary"]["failed"] = int(summary_match.group(2))
            self.results["summary"]["skipped"] = int(summary_match.group(3))
            self.results["summary"]["total"] = (
                self.results["summary"]["passed"] +
                self.results["summary"]["failed"] +
                self.results["summary"]["skipped"]
            )

        # Individual tests: "test test_name ... ok"
        test_pattern = r'test\s+([\w:]+)\s+\.\.\.\s+(ok|FAILED)'
        for match in re.finditer(test_pattern, self.output):
            status = "passed" if match.group(2) == "ok" else "failed"
            self.results["tests"].append({
                "name": match.group(1),
                "status": status,
                "duration": None
            })

    def _parse_vitest(self):
        """Parse Vitest output (similar to Jest)."""
        self._parse_jest()  # Vitest uses similar format

    def _parse_playwright(self):
        """Parse Playwright output."""
        # Summary: "5 passed (3s)"
        summary_match = re.search(r'(\d+)\s+passed\s+\(([^)]+)\)', self.output)
        if summary_match:
            self.results["summary"]["passed"] = int(summary_match.group(1))
            self.results["summary"]["total"] = int(summary_match.group(1))
            self.results["summary"]["duration"] = match.group(2)

        # Failed tests
        failed_match = re.search(r'(\d+)\s+failed', self.output)
        if failed_match:
            self.results["summary"]["failed"] = int(failed_match.group(1))
            self.results["summary"]["total"] += self.results["summary"]["failed"]

    def _parse_generic(self):
        """Generic parser for unknown frameworks."""
        # Look for common pass/fail patterns
        pass_count = len(re.findall(r'\bpass(?:ed)?\b', self.output, re.IGNORECASE))
        fail_count = len(re.findall(r'\bfail(?:ed)?\b', self.output, re.IGNORECASE))

        self.results["summary"]["passed"] = pass_count
        self.results["summary"]["failed"] = fail_count
        self.results["summary"]["total"] = pass_count + fail_count

def main():
    if len(sys.argv) > 1:
        # Read from file
        file_path = Path(sys.argv[1])
        if not file_path.exists():
            print(f"Error: File not found: {file_path}", file=sys.stderr)
            sys.exit(1)
        output = file_path.read_text(encoding='utf-8')
    else:
        # Read from stdin
        output = sys.stdin.read()

    parser = TestOutputParser(output)
    results = parser.parse()

    # Output as JSON
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
