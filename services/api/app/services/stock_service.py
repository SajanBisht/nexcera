from datetime import datetime

from app.providers.base import StockDataProvider
from app.schemas.stock import HistoricalPrice, StockQuote


class StockService:
    """Coordinate stock-data retrieval through a provider."""

    def __init__(self, provider: StockDataProvider) -> None:
        self.provider = provider

    def get_quote(self, symbol: str) -> StockQuote:
        """Retrieve the latest quote for a stock."""
        normalized_symbol = self._normalize_symbol(symbol)
        return self.provider.get_quote(normalized_symbol)

    def get_historical_prices(
        self,
        symbol: str,
        start: datetime,
        end: datetime,
    ) -> list[HistoricalPrice]:
        """Retrieve historical prices for a stock within a time range."""
        normalized_symbol = self._normalize_symbol(symbol)
        self._validate_date_range(start, end)

        return self.provider.get_historical_prices(normalized_symbol, start, end)

    @staticmethod
    def _normalize_symbol(symbol: str) -> str:
        """Normalize a stock symbol and reject empty or malformed values."""
        normalized_symbol = symbol.strip().upper()

        if not normalized_symbol:
            raise ValueError("Stock symbol must not be empty")

        if len(normalized_symbol) > 20:
            raise ValueError("Stock symbol must not exceed 20 characters")

        if not all(char.isalnum() or char in ".-" for char in normalized_symbol):
            raise ValueError("Stock symbol contains invalid characters")

        return normalized_symbol

    @staticmethod
    def _validate_date_range(start: datetime, end: datetime) -> None:
        """Validate date ordering and require consistent timezone awareness."""
        if (start.tzinfo is None) != (end.tzinfo is None):
            raise ValueError(
                "Start and end timestamps must both be timezone-aware or both naive"
            )

        if start > end:
            raise ValueError("Start time must not be after end time")
