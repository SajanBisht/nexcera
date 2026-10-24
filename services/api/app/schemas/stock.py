from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, model_validator


class StockQuote(BaseModel):
    """Normalized representation of a stock's latest quote."""

    model_config = ConfigDict(extra="forbid")

    symbol: str = Field(min_length=1, max_length=20)
    company_name: str = Field(min_length=1, max_length=200)
    currency: str = Field(min_length=3, max_length=3)
    price: Decimal = Field(gt=0)
    change: Decimal
    change_percent: Decimal
    timestamp: datetime


class HistoricalPrice(BaseModel):
    """Normalized representation of a stock price at a point in time."""

    model_config = ConfigDict(extra="forbid")

    symbol: str = Field(min_length=1, max_length=20)
    timestamp: datetime
    open: Decimal = Field(gt=0)
    high: Decimal = Field(gt=0)
    low: Decimal = Field(gt=0)
    close: Decimal = Field(gt=0)
    volume: int = Field(ge=0)

    @model_validator(mode="after")
    def validate_price_range(self) -> HistoricalPrice:
        """Ensure OHLC values form a consistent price range."""
        if self.high < max(self.open, self.low, self.close):
            raise ValueError(
                "High must be greater than or equal to open, low, and close"
            )

        if self.low > min(self.open, self.high, self.close):
            raise ValueError("Low must be less than or equal to open, high, and close")

        return self
