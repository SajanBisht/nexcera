from decimal import Decimal

from app.api.v1.endpoints.stocks import get_stock_service
from app.main import app
from app.providers.errors import (
    StockProviderError,
    StockProviderUnavailableError,
)
from app.providers.mock import MockStockDataProvider
from app.services.stock_service import StockService
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


def test_unknown_stock_symbol_returns_404() -> None:
    response = client.get("/api/v1/stocks/UNKNOWN/quote")

    assert response.status_code == 404
    assert "was not found" in response.json()["detail"]


def test_provider_unavailable_returns_503() -> None:
    class UnavailableProvider(MockStockDataProvider):
        def get_quote(self, symbol: str):
            raise StockProviderUnavailableError("Provider is unavailable")

    app.dependency_overrides[get_stock_service] = lambda: StockService(
        UnavailableProvider()
    )

    try:
        response = client.get("/api/v1/stocks/AAPL/quote")
    finally:
        app.dependency_overrides.pop(get_stock_service, None)

    assert response.status_code == 503
    assert response.json()["detail"] == "Provider is unavailable"


def test_unexpected_provider_error_returns_502() -> None:
    class FailingProvider(MockStockDataProvider):
        def get_quote(self, symbol: str):
            raise StockProviderError("Unexpected provider failure")

    app.dependency_overrides[get_stock_service] = lambda: StockService(
        FailingProvider()
    )

    try:
        response = client.get("/api/v1/stocks/AAPL/quote")
    finally:
        app.dependency_overrides.pop(get_stock_service, None)

    assert response.status_code == 502
    assert response.json()["detail"] == (
        "Stock data provider failed to fulfill the request"
    )
