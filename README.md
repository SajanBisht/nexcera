# Nexcera

An intelligent stock market forecasting and paper-trading platform combining
machine learning, uncertainty estimation, market regime detection, and
historical market data analytics.

## Project Goals

- Ingest and validate historical market data.
- Build reproducible data-cleaning and feature-engineering pipelines.
- Train and evaluate stock forecasting models.
- Estimate forecast uncertainty using conformal prediction.
- Identify market regimes and communicate prediction uncertainty.
- Expose predictions through a FastAPI backend.
- Visualize market data, forecasts, and virtual portfolio performance.
- Support paper trading without placing real financial orders.

## Architecture

Nexcera is organized as a modular monorepo.

| Module | Directory | Responsibility |
|---|---|---|
| Data Engineering | `data-pipeline/` | Ingestion, cleaning, features, storage, caching |
| Machine Learning | `ml/` | Training, inference, calibration, evaluation |
| Backend | `services/api/` | REST APIs, database, business logic |
| Frontend | `apps/frontend/` | Dashboard, charts, forecasts, portfolio |
| Shared Contracts | `contracts/` | API specifications and data schemas |
| Infrastructure | `infrastructure/` | Docker, PostgreSQL, Redis, monitoring |

## Development Principles

- Keep modules independently testable.
- Define shared interfaces before integration.
- Prevent data leakage in financial time-series evaluation.
- Never commit credentials, large datasets, or generated model artifacts.
- Use feature branches and pull requests for contributions.

## Project Status

Initial repository scaffold. Application modules are under development.

## Disclaimer

Nexcera is an experimental software project for research and paper trading.
Forecasts are uncertain and must not be treated as guaranteed financial returns.
