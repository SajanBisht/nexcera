class StockProviderError(Exception):
    """Base exception for stock-data provider failures."""


class StockNotFoundError(StockProviderError):
    """Raised when a provider cannot find the requested stock."""


class StockProviderUnavailableError(StockProviderError):
    """Raised when a stock-data provider cannot fulfill a request."""
