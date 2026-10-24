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

        if start > end:
            raise ValueError("Start time must not be after end time")

        return self.provider.get_historical_prices(normalized_symbol, start, end)

    @staticmethod
    def _normalize_symbol(symbol: str) -> str:
        """Normalize a stock symbol and reject empty values."""
        normalized_symbol = symbol.strip().upper()

        if not normalized_symbol:
            raise ValueError("Stock symbol must not be empty")

        return normalized_symbol
