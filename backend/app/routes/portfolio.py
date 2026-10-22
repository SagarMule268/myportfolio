from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.portfolio import PortfolioResponse
from app.services import about as about_service
from app.services import education as education_service
from app.services import experience as experience_service
from app.services import hero as hero_service
from app.services import project as project_service
from app.services import skill as skill_service
from app.services import social_links as social_links_service


router = APIRouter(
    prefix="/portfolio",
    tags=["Portfolio"],
)


@router.get("/", response_model=PortfolioResponse)
def get_portfolio(db: Session = Depends(get_db)) -> PortfolioResponse:
    return PortfolioResponse(
        hero=hero_service.get_hero(db),
        about=about_service.get_about(db),
        projects=project_service.get_projects(db),
        experiences=experience_service.get_experiences(db),
        education=education_service.get_educations(db),
        skills=skill_service.get_skills(db),
        social_links=[
            social_link
            for social_link in social_links_service.get_SocialLinks(db)
            if social_link.is_visible
        ],
    )
