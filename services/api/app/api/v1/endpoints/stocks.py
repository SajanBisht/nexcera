from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query

from app.providers.mock import MockStockDataProvider
from app.schemas.stock import HistoricalPrice, StockQuote
from app.services.stock_service import StockService

router = APIRouter(prefix="/stocks", tags=["Stocks"])


def get_stock_service() -> StockService:
    """Provide the stock service used by API endpoints."""
    return StockService(provider=MockStockDataProvider())


StockServiceDependency = Annotated[StockService, Depends(get_stock_service)]


@router.get("/{symbol}/quote", response_model=StockQuote)
def get_stock_quote(
    symbol: str,
    service: StockServiceDependency,
) -> StockQuote:
    """Return the latest available quote for a stock."""
    try:
        return service.get_quote(symbol)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.get("/{symbol}/history", response_model=list[HistoricalPrice])
def get_stock_history(
    symbol: str,
    start: Annotated[
        datetime,
        Query(description="Start of the requested time range."),
    ],
    end: Annotated[
        datetime,
        Query(description="End of the requested time range."),
    ],
    service: StockServiceDependency,
) -> list[HistoricalPrice]:
    """Return historical prices within the requested time range."""
    try:
        return service.get_historical_prices(symbol, start, end)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
