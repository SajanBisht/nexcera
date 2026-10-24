from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_health_endpoint_returns_success() -> None:
    response = client.get("/health")

    assert response.status_code == 200


def test_health_endpoint_returns_expected_json() -> None:
    response = client.get("/health")

    assert response.json() == {"status": "ok"}


def test_health_endpoint_returns_json_content_type() -> None:
    response = client.get("/health")

    assert response.headers["content-type"].startswith("application/json")


def test_versioned_health_endpoint_returns_success() -> None:
    response = client.get("/api/v1/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
