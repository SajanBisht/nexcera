from fastapi import APIRouter

router = APIRouter()


@router.get("/health", tags=["Health"])
def health_check() -> dict[str, str]:
    """Report whether the API application is running."""
    return {"status": "ok"}
