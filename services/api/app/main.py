from fastapi import FastAPI

app = FastAPI(
    title="Nexcera API",
    description="Stock-market forecasting and paper-trading API.",
    version="0.1.0",
)


@app.get("/health", tags=["Health"])
def health_check() -> dict[str, str]:
    """Report whether the API application is running."""
    return {"status": "ok"}
