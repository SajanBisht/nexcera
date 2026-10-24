from datetime import datetime
from decimal import Decimal

from app.providers.base import StockDataProvider
from app.schemas.stock import HistoricalPrice, StockQuote


class MockStockDataProvider(StockDataProvider):
    """Provide deterministic stock data for development and testing."""

    def get_quote(self, symbol: str) -> StockQuote:
        normalized_symbol = symbol.strip().upper()

        if not normalized_symbol:
            raise ValueError("Stock symbol must not be empty")

        return StockQuote(
            symbol=normalized_symbol,
            company_name=self._get_company_name(normalized_symbol),
            currency="USD",
            price=Decimal("250.00"),
            change=Decimal("2.50"),
            change_percent=Decimal("1.01"),
            timestamp=datetime.fromisoformat("2026-10-24T09:00:00+00:00"),
        )

    def get_historical_prices(
        self,
        symbol: str,
        start: datetime,
        end: datetime,
    ) -> list[HistoricalPrice]:
        normalized_symbol = symbol.strip().upper()

        if not normalized_symbol:
            raise ValueError("Stock symbol must not be empty")

        if start > end:
            raise ValueError("Start time must not be after end time")

        sample_timestamp = datetime.fromisoformat("2026-10-24T09:00:00+00:00")

        if not start <= sample_timestamp <= end:
            return []

        return [
            HistoricalPrice(
                symbol=normalized_symbol,
                timestamp=sample_timestamp,
                open=Decimal("248.00"),
                high=Decimal("252.00"),
                low=Decimal("247.00"),
                close=Decimal("250.00"),
                volume=1_000_000,
            )
        ]

    @staticmethod
    def _get_company_name(symbol: str) -> str:
        """Return a sample company name for recognized symbols."""
        companies = {
            "AAPL": "Apple Inc.",
            "MSFT": "Microsoft Corporation",
            "GOOGL": "Alphabet Inc.",
            "NVDA": "NVIDIA Corporation",
            "AMZN": "Amazon.com Inc.",
        }

        return companies.get(symbol, f"{symbol} Corporation")
