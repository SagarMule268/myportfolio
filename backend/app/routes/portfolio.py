from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.portfolio import PortfolioResponse
from app.services.portfolio import get_portfolio as get_portfolio_service


router = APIRouter(
    prefix="/portfolio",
    tags=["Portfolio"],
)


@router.get("/", response_model=PortfolioResponse)
def get_portfolio(db: Session = Depends(get_db)) -> PortfolioResponse:
    return get_portfolio_service(db)
