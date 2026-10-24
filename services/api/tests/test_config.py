from app.core.config import Settings


def test_settings_use_default_values(monkeypatch) -> None:
    monkeypatch.delenv("NEXCERA_APP_NAME", raising=False)
    monkeypatch.delenv("NEXCERA_ENVIRONMENT", raising=False)
    monkeypatch.delenv("NEXCERA_API_V1_PREFIX", raising=False)

    config = Settings(_env_file=None)

    assert config.app_name == "Nexcera API"
    assert config.environment == "development"
    assert config.api_v1_prefix == "/api/v1"


def test_settings_read_environment_variables(monkeypatch) -> None:
    monkeypatch.setenv("NEXCERA_APP_NAME", "Nexcera Test")
    monkeypatch.setenv("NEXCERA_ENVIRONMENT", "testing")
    monkeypatch.setenv("NEXCERA_API_V1_PREFIX", "/test/v1")

    config = Settings(_env_file=None)

    assert config.app_name == "Nexcera Test"
    assert config.environment == "testing"
    assert config.api_v1_prefix == "/test/v1"
