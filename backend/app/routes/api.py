from fastapi import APIRouter

from app.routes.contact_message import router as contact_message_router
from app.routes.education import router as education_router
from app.routes.experience import router as experience_router
from app.routes.project import router as project_router
from app.routes.skill import router as skill_router
from app.routes.auth import router as auth_router
from app.routes.hero import router as hero_router
from app.routes.portfolio import router as portfolio_router
from app.routes.about import router as about_router
from app.routes.social_links import router as social_links_router
from app.routes.uploads import router as uploads_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(project_router)
api_router.include_router(experience_router)
api_router.include_router(education_router)
api_router.include_router(skill_router)
api_router.include_router(contact_message_router)
api_router.include_router(auth_router)
api_router.include_router(hero_router)
api_router.include_router(portfolio_router)
api_router.include_router(about_router)
api_router.include_router(social_links_router)
api_router.include_router(uploads_router)
