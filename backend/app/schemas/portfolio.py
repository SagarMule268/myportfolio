from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.schemas.about import AboutResponse
from app.schemas.education import EducationResponse
from app.schemas.experience import ExperienceResponse
from app.schemas.hero import HeroResponse
from app.schemas.project import ProjectResponse
from app.schemas.skill import SkillResponse
from app.schemas.social_links import SocialLinkBase


class PortfolioSocialLinkResponse(SocialLinkBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID


class PortfolioResponse(BaseModel):
    hero: HeroResponse | None
    about: AboutResponse | None
    projects: list[ProjectResponse]
    experiences: list[ExperienceResponse]
    education: list[EducationResponse]
    skills: list[SkillResponse]
    social_links: list[PortfolioSocialLinkResponse]
