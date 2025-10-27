#!/usr/bin/env python3
"""
Feature Workflow Orchestrator

Orchestrates the complete feature implementation workflow:
1. Research (feature-research skill)
2. Planning (implementation-planner skill)
3. Implementation (feature-implementer skill)
4. Testing (test-executor skill)
5. Fixing (test-fixer skill)

Usage:
    python orchestrate.py [--config config.json]
    python orchestrate.py --phases research,plan,implement
    python orchestrate.py --skip research --max-iterations 5

This is a reference implementation. In practice, Claude Code would
orchestrate skills by invoking them through the Skill tool.
"""

import sys
import json
import argparse
from pathlib import Path
from typing import Dict, List, Any, Optional

class WorkflowOrchestrator:
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.workflow_config = config.get("workflow", {})
        self.state = {
            "current_phase": None,
            "completed_phases": [],
            "failed_phases": [],
            "iteration": 0
        }

    def run(self):
        """Run the workflow based on configuration."""
        phases = self.workflow_config.get("phases", [
            "research", "plan", "implement", "test", "fix"
        ])
        skip_phases = self.workflow_config.get("skip_phases", [])
        stop_after = self.workflow_config.get("stop_after", None)

        print("🚀 Starting Feature Implementation Workflow")
        print("=" * 60)
        print(f"Phases: {', '.join(phases)}")
        if skip_phases:
            print(f"Skipping: {', '.join(skip_phases)}")
        if stop_after:
            print(f"Stop after: {stop_after}")
        print("=" * 60)
        print()

        for phase in phases:
            if phase in skip_phases:
                print(f"⏭️  Skipping Phase: {phase}")
                print()
                continue

            self.state["current_phase"] = phase
            print(f"▶️  Starting Phase: {phase}")
            print("-" * 60)

            success = self._run_phase(phase)

            if success:
                self.state["completed_phases"].append(phase)
                print(f"✅ Completed Phase: {phase}")
            else:
                self.state["failed_phases"].append(phase)
                print(f"❌ Failed Phase: {phase}")
                self._handle_phase_failure(phase)
                break

            print()

            if stop_after and phase == stop_after:
                print(f"🛑 Stopping after phase: {stop_after}")
                break

        self._print_summary()

    def _run_phase(self, phase: str) -> bool:
        """Run a specific phase."""
        if phase == "research":
            return self._run_research()
        elif phase == "plan":
            return self._run_planning()
        elif phase == "implement":
            return self._run_implementation()
        elif phase == "test":
            return self._run_testing()
        elif phase == "fix":
            return self._run_fixing()
        else:
            print(f"❌ Unknown phase: {phase}")
            return False

    def _run_research(self) -> bool:
        """Run research phase."""
        print("📚 Research Phase")
        print("  → Using feature-research skill")
        print("  → Interactive research with user")
        print("  → Consulting MCP Deep Wiki")
        print("  → Creating POC if needed")

        # In real implementation, Claude would invoke:
        # Skill(command="feature-research")

        print("  → Generated: findings.md")
        print("  ✓ Research complete")
        return True

    def _run_planning(self) -> bool:
        """Run planning phase."""
        print("📋 Planning Phase")
        print("  → Using implementation-planner skill")
        print("  → Reading: findings.md")
        print("  → Generating implementation plan")

        # In real implementation:
        # Skill(command="implementation-planner")

        print("  → Generated: Plan.md")
        print("  ✓ Planning complete")
        return True

    def _run_implementation(self) -> bool:
        """Run implementation phase."""
        print("⚙️  Implementation Phase")
        print("  → Using feature-implementer skill")
        print("  → Reading: Plan.md")
        print("  → Implementing steps")

        impl_config = self.config.get("implementation", {})
        if impl_config.get("use_worktree", False):
            print("  → Creating git worktree")

        # In real implementation:
        # Skill(command="feature-implementer")

        print("  → Implemented code")
        print("  → Generated: test-plan.md")
        print("  ✓ Implementation complete")
        return True

    def _run_testing(self) -> bool:
        """Run testing phase."""
        print("🧪 Testing Phase")
        print("  → Using test-executor skill")
        print("  → Reading: test-plan.md")
        print("  → Executing tests")

        # In real implementation:
        # Skill(command="test-executor")

        # Simulate test results
        has_failures = False  # In reality, check test results

        if has_failures:
            print("  → Generated: test-failures.md")
            print("  ⚠️  Tests have failures")
            return False  # Will proceed to fix phase
        else:
            print("  ✅ All tests passed")
            return True

    def _run_fixing(self) -> bool:
        """Run fixing phase."""
        max_iterations = self.config.get("fixing", {}).get("max_fix_iterations", 3)
        auto_retest = self.config.get("fixing", {}).get("auto_retest", True)

        print(f"🔧 Fixing Phase (iteration {self.state['iteration'] + 1}/{max_iterations})")
        print("  → Using test-fixer skill")
        print("  → Reading: test-failures.md")
        print("  → Fixing failures")

        # In real implementation:
        # Skill(command="test-fixer")

        if auto_retest:
            print("  → Re-running tests")
            # In reality: run test-executor again

            # Simulate: still have failures?
            still_failing = False

            if still_failing and self.state["iteration"] < max_iterations - 1:
                self.state["iteration"] += 1
                print(f"  ⚠️  Still have failures, iteration {self.state['iteration'] + 1}")
                return self._run_fixing()  # Recursive fix loop
            elif still_failing:
                print(f"  ❌ Max iterations ({max_iterations}) reached")
                return False
            else:
                print("  ✅ All tests passing after fixes")
                return True
        else:
            print("  ✓ Fixes applied (auto-retest disabled)")
            return True

    def _handle_phase_failure(self, phase: str):
        """Handle phase failure."""
        print()
        print("❌ Phase Failed")
        print(f"   Phase: {phase}")
        print()
        print("Options:")
        print("  1. Review error logs")
        print("  2. Retry phase")
        print("  3. Skip phase (if non-critical)")
        print("  4. Abort workflow")

    def _print_summary(self):
        """Print workflow summary."""
        print()
        print("=" * 60)
        print("📊 Workflow Summary")
        print("=" * 60)
        print(f"Completed: {', '.join(self.state['completed_phases']) if self.state['completed_phases'] else 'None'}")
        if self.state['failed_phases']:
            print(f"Failed: {', '.join(self.state['failed_phases'])}")
        print()

        if not self.state['failed_phases']:
            print("✅ Workflow completed successfully!")
        else:
            print("⚠️  Workflow incomplete (see failures above)")

        print("=" * 60)

def load_config(config_path: Optional[str] = None) -> Dict[str, Any]:
    """Load workflow configuration."""
    default_config = {
        "workflow": {
            "phases": ["research", "plan", "implement", "test", "fix"],
            "skip_phases": [],
            "stop_after": None,
            "auto_iterate": True,
            "max_iterations": 3
        },
        "research": {
            "create_poc": "if_needed",
            "output_file": "findings.md"
        },
        "planning": {
            "output_file": "Plan.md",
            "validate": True
        },
        "implementation": {
            "use_worktree": False,
            "build_after_each_step": False,
            "test_after_each_step": False
        },
        "testing": {
            "test_plan_file": "test-plan.md",
            "failure_report_file": "test-failures.md",
            "stop_on_first_failure": False
        },
        "fixing": {
            "max_fix_iterations": 3,
            "auto_retest": True
        }
    }

    if config_path:
        config_file = Path(config_path)
        if config_file.exists():
            with open(config_file, 'r') as f:
                user_config = json.load(f)
                # Merge with defaults
                for key, value in user_config.items():
                    if key in default_config and isinstance(value, dict):
                        default_config[key].update(value)
                    else:
                        default_config[key] = value

    return default_config

def main():
    parser = argparse.ArgumentParser(description="Feature Workflow Orchestrator")
    parser.add_argument("--config", help="Path to workflow config JSON file")
    parser.add_argument("--phases", help="Comma-separated phases to run")
    parser.add_argument("--skip", help="Comma-separated phases to skip")
    parser.add_argument("--stop-after", help="Stop after this phase")
    parser.add_argument("--max-iterations", type=int, help="Max fix iterations")
    parser.add_argument("--full", action="store_true", help="Run full workflow (all phases)")

    args = parser.parse_args()

    # Load config
    config = load_config(args.config)

    # Override with CLI args
    if args.phases:
        config["workflow"]["phases"] = args.phases.split(",")
    if args.skip:
        config["workflow"]["skip_phases"] = args.skip.split(",")
    if args.stop_after:
        config["workflow"]["stop_after"] = args.stop_after
    if args.max_iterations:
        config["fixing"]["max_fix_iterations"] = args.max_iterations
    if args.full:
        config["workflow"]["phases"] = ["research", "plan", "implement", "test", "fix"]
        config["workflow"]["skip_phases"] = []

    # Run orchestrator
    orchestrator = WorkflowOrchestrator(config)
    orchestrator.run()

if __name__ == "__main__":
    main()
