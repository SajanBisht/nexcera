from datetime import UTC, datetime
from decimal import Decimal

import pytest
from app.providers.mock import MockStockDataProvider
from app.schemas.stock import HistoricalPrice, StockQuote


@pytest.fixture
def provider() -> MockStockDataProvider:
    return MockStockDataProvider()


def test_mock_provider_returns_quote(provider: MockStockDataProvider) -> None:
    quote = provider.get_quote("AAPL")

    assert isinstance(quote, StockQuote)
    assert quote.symbol == "AAPL"
    assert quote.company_name == "Apple Inc."
    assert quote.price == Decimal("250.00")
    assert quote.currency == "USD"


def test_mock_provider_normalizes_symbol(
    provider: MockStockDataProvider,
) -> None:
    quote = provider.get_quote("  aapl  ")

    assert quote.symbol == "AAPL"


def test_mock_provider_supports_multiple_symbols(
    provider: MockStockDataProvider,
) -> None:
    quote = provider.get_quote("MSFT")

    assert quote.company_name == "Microsoft Corporation"


def test_mock_provider_returns_historical_prices(
    provider: MockStockDataProvider,
) -> None:
    start = datetime(2026, 10, 24, 8, 0, tzinfo=UTC)
    end = datetime(2026, 10, 24, 10, 0, tzinfo=UTC)

    prices = provider.get_historical_prices("AAPL", start, end)

    assert len(prices) == 1
    assert isinstance(prices[0], HistoricalPrice)
    assert prices[0].close == Decimal("250.00")


def test_mock_provider_returns_empty_outside_date_range(
    provider: MockStockDataProvider,
) -> None:
    start = datetime(2026, 10, 25, 0, 0, tzinfo=UTC)
    end = datetime(2026, 10, 26, 0, 0, tzinfo=UTC)

    prices = provider.get_historical_prices("AAPL", start, end)

    assert prices == []


def test_mock_provider_rejects_empty_symbol(
    provider: MockStockDataProvider,
) -> None:
    with pytest.raises(ValueError, match="Stock symbol must not be empty"):
        provider.get_quote("   ")


def test_mock_provider_rejects_invalid_date_range(
    provider: MockStockDataProvider,
) -> None:
    start = datetime(2026, 10, 25, tzinfo=UTC)
    end = datetime(2026, 10, 24, tzinfo=UTC)

    with pytest.raises(ValueError, match="Start time must not be after end time"):
        provider.get_historical_prices("AAPL", start, end)
