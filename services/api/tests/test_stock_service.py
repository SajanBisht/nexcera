from datetime import UTC, datetime
from decimal import Decimal

import pytest
from app.providers.base import StockDataProvider
from app.schemas.stock import HistoricalPrice, StockQuote
from app.services.stock_service import StockService


class FakeStockDataProvider(StockDataProvider):
    """Controlled provider for testing the stock service."""

    def __init__(self) -> None:
        self.last_quote_symbol: str | None = None
        self.last_history_request: tuple[str, datetime, datetime] | None = None

    def get_quote(self, symbol: str) -> StockQuote:
        self.last_quote_symbol = symbol

        return StockQuote(
            symbol=symbol,
            company_name="Apple Inc.",
            currency="USD",
            price=Decimal("250.00"),
            change=Decimal("2.50"),
            change_percent=Decimal("1.01"),
            timestamp=datetime(2026, 10, 24, 9, 0, tzinfo=UTC),
        )

    def get_historical_prices(
        self,
        symbol: str,
        start: datetime,
        end: datetime,
    ) -> list[HistoricalPrice]:
        self.last_history_request = (symbol, start, end)

        return [
            HistoricalPrice(
                symbol=symbol,
                timestamp=start,
                open=Decimal("248.00"),
                high=Decimal("252.00"),
                low=Decimal("247.00"),
                close=Decimal("250.00"),
                volume=1_000_000,
            )
        ]


@pytest.fixture
def provider() -> FakeStockDataProvider:
    return FakeStockDataProvider()


@pytest.fixture
def service(provider: FakeStockDataProvider) -> StockService:
    return StockService(provider)


def test_get_quote_normalizes_symbol(
    service: StockService,
    provider: FakeStockDataProvider,
) -> None:
    quote = service.get_quote("  aapl  ")

    assert quote.symbol == "AAPL"
    assert provider.last_quote_symbol == "AAPL"


def test_get_quote_returns_provider_result(service: StockService) -> None:
    quote = service.get_quote("AAPL")

    assert isinstance(quote, StockQuote)
    assert quote.price == Decimal("250.00")


def test_get_historical_prices_delegates_to_provider(
    service: StockService,
    provider: FakeStockDataProvider,
) -> None:
    start = datetime(2026, 10, 24, 8, 0, tzinfo=UTC)
    end = datetime(2026, 10, 24, 16, 0, tzinfo=UTC)

    prices = service.get_historical_prices(" aapl ", start, end)

    assert len(prices) == 1
    assert prices[0].symbol == "AAPL"
    assert provider.last_history_request == ("AAPL", start, end)


def test_get_historical_prices_rejects_invalid_range(
    service: StockService,
) -> None:
    start = datetime(2026, 10, 25, tzinfo=UTC)
    end = datetime(2026, 10, 24, tzinfo=UTC)

    with pytest.raises(ValueError, match="Start time must not be after end time"):
        service.get_historical_prices("AAPL", start, end)


def test_get_quote_rejects_empty_symbol(service: StockService) -> None:
    with pytest.raises(ValueError, match="Stock symbol must not be empty"):
        service.get_quote("   ")


def test_get_historical_prices_rejects_empty_symbol(
    service: StockService,
) -> None:
    start = datetime(2026, 10, 24, tzinfo=UTC)
    end = datetime(2026, 10, 25, tzinfo=UTC)

    with pytest.raises(ValueError, match="Stock symbol must not be empty"):
        service.get_historical_prices("   ", start, end)


def test_get_quote_rejects_symbol_with_invalid_characters(
    service: StockService,
) -> None:
    with pytest.raises(ValueError, match="Stock symbol contains invalid characters"):
        service.get_quote("AAP L")


def test_get_quote_rejects_symbol_longer_than_20_characters(
    service: StockService,
) -> None:
    with pytest.raises(ValueError, match="Stock symbol must not exceed 20 characters"):
        service.get_quote("A" * 21)


def test_get_historical_prices_rejects_mixed_timezone_awareness(
    service: StockService,
) -> None:
    start = datetime(2026, 10, 24, 8, 0, tzinfo=UTC)
    end = datetime(2026, 10, 24, 10, 0)

    with pytest.raises(
        ValueError,
        match="Start and end timestamps must both be timezone-aware or both naive",
    ):
        service.get_historical_prices("AAPL", start, end)


def test_get_historical_prices_accepts_timezone_aware_range(
    service: StockService,
) -> None:
    start = datetime(2026, 10, 24, 8, 0, tzinfo=UTC)
    end = datetime(2026, 10, 24, 10, 0, tzinfo=UTC)

    prices = service.get_historical_prices("AAPL", start, end)

    assert len(prices) == 1
