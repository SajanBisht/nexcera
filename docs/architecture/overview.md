# Nexcera Architecture

## Planned data flow

Market data provider
    -> Data ingestion
    -> Validation and cleaning
    -> Feature engineering
    -> Dataset storage
    -> Model training and evaluation
    -> Forecast inference
    -> Conformal uncertainty calibration
    -> FastAPI
    -> React dashboard

PostgreSQL is the planned persistent database.
Redis is the planned cache for suitable market-data and forecast results.

## Module ownership

- Member 1: `data-pipeline/`
- Member 2: `ml/`
- Member 3: `services/api/`
- Member 4: `apps/frontend/`

Modules should communicate through documented interfaces rather than depending
on each other's internal implementation details.
