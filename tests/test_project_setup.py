from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]


def test_required_project_directories_exist():
    """Ensure the main Nexcera components exist."""
    required_directories = [
        "apps/frontend",
        "services/api",
        "ml",
        "data-pipeline",
        "contracts",
        "infrastructure",
        "tests",
    ]

    for directory in required_directories:
        assert (PROJECT_ROOT / directory).is_dir(), (
            f"Missing required directory: {directory}"
        )


def test_development_dependencies_are_documented():
    """Ensure development dependencies are documented."""
    requirements_file = PROJECT_ROOT / "requirements-dev.txt"

    assert requirements_file.is_file()
    requirements = requirements_file.read_text(encoding="utf-8")

    assert "pytest==" in requirements
    assert "ruff==" in requirements
