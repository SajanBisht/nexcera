from datetime import UTC, datetime
from decimal import Decimal

import pytest
from app.providers.base import StockDataProvider
from app.schemas.stock import HistoricalPrice, StockQuote


class ExampleStockDataProvider(StockDataProvider):
    """Minimal implementation used to test the provider contract."""

    def get_quote(self, symbol: str) -> StockQuote:
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


def test_provider_implementation_can_be_instantiated() -> None:
    provider = ExampleStockDataProvider()

    assert isinstance(provider, StockDataProvider)


def test_provider_quote_returns_stock_quote() -> None:
    provider = ExampleStockDataProvider()

    quote = provider.get_quote("AAPL")

    assert isinstance(quote, StockQuote)
    assert quote.symbol == "AAPL"
    assert quote.price == Decimal("250.00")


def test_provider_historical_prices_returns_price_list() -> None:
    provider = ExampleStockDataProvider()
    start = datetime(2026, 10, 24, 9, 0, tzinfo=UTC)
    end = datetime(2026, 10, 24, 16, 0, tzinfo=UTC)

    prices = provider.get_historical_prices("AAPL", start, end)

    assert len(prices) == 1
    assert isinstance(prices[0], HistoricalPrice)
    assert prices[0].symbol == "AAPL"


def test_incomplete_provider_cannot_be_instantiated() -> None:
    class IncompleteProvider(StockDataProvider):
        def get_quote(self, symbol: str) -> StockQuote:
            raise NotImplementedError

    with pytest.raises(TypeError, match="get_historical_prices"):
        IncompleteProvider()
