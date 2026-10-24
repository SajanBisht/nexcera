from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_health_endpoint_returns_success():
    response = client.get("/health")

    assert response.status_code == 200


def test_health_endpoint_returns_expected_json():
    response = client.get("/health")

    assert response.json() == {"status": "ok"}


def test_health_endpoint_returns_json_content_type():
    response = client.get("/health")

    assert response.headers["content-type"].startswith("application/json")
