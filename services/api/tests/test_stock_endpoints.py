from decimal import Decimal

from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_get_stock_quote_returns_expected_response() -> None:
    response = client.get("/api/v1/stocks/AAPL/quote")

    assert response.status_code == 200

    data = response.json()
    assert data["symbol"] == "AAPL"
    assert data["company_name"] == "Apple Inc."
    assert data["currency"] == "USD"
    assert Decimal(data["price"]) == Decimal("250.00")


def test_get_stock_quote_normalizes_symbol() -> None:
    response = client.get("/api/v1/stocks/aapl/quote")

    assert response.status_code == 200
    assert response.json()["symbol"] == "AAPL"


def test_get_stock_quote_rejects_empty_symbol() -> None:
    response = client.get("/api/v1/stocks/%20%20/quote")

    assert response.status_code == 400
    assert response.json()["detail"] == "Stock symbol must not be empty"


def test_get_stock_history_returns_expected_response() -> None:
    start = "2026-10-24T08:00:00Z"
    end = "2026-10-24T10:00:00Z"

    response = client.get(
        "/api/v1/stocks/AAPL/history",
        params={"start": start, "end": end},
    )

    assert response.status_code == 200

    data = response.json()
    assert len(data) == 1
    assert data[0]["symbol"] == "AAPL"
    assert Decimal(data[0]["close"]) == Decimal("250.00")
    assert data[0]["volume"] == 1_000_000


def test_get_stock_history_returns_empty_list_outside_sample_range() -> None:
    response = client.get(
        "/api/v1/stocks/AAPL/history",
        params={
            "start": "2026-10-25T00:00:00Z",
            "end": "2026-10-26T00:00:00Z",
        },
    )

    assert response.status_code == 200
    assert response.json() == []


def test_get_stock_history_rejects_invalid_date_range() -> None:
    response = client.get(
        "/api/v1/stocks/AAPL/history",
        params={
            "start": "2026-10-25T00:00:00Z",
            "end": "2026-10-24T00:00:00Z",
        },
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Start time must not be after end time"


def test_get_stock_history_requires_start_and_end() -> None:
    response = client.get("/api/v1/stocks/AAPL/history")

    assert response.status_code == 422


def test_get_stock_history_rejects_empty_symbol() -> None:
    response = client.get(
        "/api/v1/stocks/%20%20/history",
        params={
            "start": "2026-10-24T08:00:00Z",
            "end": "2026-10-24T10:00:00Z",
        },
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Stock symbol must not be empty"
