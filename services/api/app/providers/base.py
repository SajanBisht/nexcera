from abc import ABC, abstractmethod
from datetime import datetime

from app.schemas.stock import HistoricalPrice, StockQuote


class StockDataProvider(ABC):
    """Contract that all stock-data providers must implement."""

    @abstractmethod
    def get_quote(self, symbol: str) -> StockQuote:
        """Return the latest available quote for a stock."""
        raise NotImplementedError

    @abstractmethod
    def get_historical_prices(
        self,
        symbol: str,
        start: datetime,
        end: datetime,
    ) -> list[HistoricalPrice]:
        """Return historical prices within the requested time range."""
        raise NotImplementedError
