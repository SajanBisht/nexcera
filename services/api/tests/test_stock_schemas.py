from datetime import UTC, datetime
from decimal import Decimal

import pytest
from app.schemas.stock import HistoricalPrice, StockQuote
from pydantic import ValidationError


def test_stock_quote_accepts_valid_data() -> None:
    quote = StockQuote(
        symbol="AAPL",
        company_name="Apple Inc.",
        currency="USD",
        price=Decimal("250.50"),
        change=Decimal("2.50"),
        change_percent=Decimal("1.01"),
        timestamp=datetime(2026, 10, 24, 9, 0, tzinfo=UTC),
    )

    assert quote.symbol == "AAPL"
    assert quote.price == Decimal("250.50")


def test_stock_quote_rejects_nonpositive_price() -> None:
    with pytest.raises(ValidationError):
        StockQuote(
            symbol="AAPL",
            company_name="Apple Inc.",
            currency="USD",
            price=Decimal("0"),
            change=Decimal("0"),
            change_percent=Decimal("0"),
            timestamp=datetime(2026, 10, 24, 9, 0, tzinfo=UTC),
        )


def test_historical_price_accepts_valid_data() -> None:
    price = HistoricalPrice(
        symbol="AAPL",
        timestamp=datetime(2026, 10, 24, 9, 0, tzinfo=UTC),
        open=Decimal("248.00"),
        high=Decimal("252.00"),
        low=Decimal("247.50"),
        close=Decimal("250.50"),
        volume=1_000_000,
    )

    assert price.close == Decimal("250.50")
    assert price.volume == 1_000_000


def test_historical_price_rejects_negative_volume() -> None:
    with pytest.raises(ValidationError):
        HistoricalPrice(
            symbol="AAPL",
            timestamp=datetime(2026, 10, 24, 9, 0, tzinfo=UTC),
            open=Decimal("248.00"),
            high=Decimal("252.00"),
            low=Decimal("247.50"),
            close=Decimal("250.50"),
            volume=-1,
        )


def test_stock_quote_rejects_unexpected_fields() -> None:
    with pytest.raises(ValidationError):
        StockQuote(
            symbol="AAPL",
            company_name="Apple Inc.",
            currency="USD",
            price=Decimal("250.50"),
            change=Decimal("2.50"),
            change_percent=Decimal("1.01"),
            timestamp=datetime(2026, 10, 24, 9, 0, tzinfo=UTC),
            unexpected_field="unexpected",
        )


def test_historical_price_rejects_high_below_close() -> None:
    with pytest.raises(ValidationError):
        HistoricalPrice(
            symbol="AAPL",
            timestamp=datetime(2026, 10, 24, 9, 0, tzinfo=UTC),
            open=Decimal("248.00"),
            high=Decimal("249.00"),
            low=Decimal("247.50"),
            close=Decimal("250.50"),
            volume=1_000_000,
        )


def test_historical_price_rejects_low_above_open() -> None:
    with pytest.raises(ValidationError):
        HistoricalPrice(
            symbol="AAPL",
            timestamp=datetime(2026, 10, 24, 9, 0, tzinfo=UTC),
            open=Decimal("248.00"),
            high=Decimal("252.00"),
            low=Decimal("249.00"),
            close=Decimal("250.50"),
            volume=1_000_000,
        )
