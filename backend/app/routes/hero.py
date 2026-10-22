from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.hero import (
    HeroCreate,
    HeroResponse,
    HeroUpdate
)
from app.services import hero as hero_service
from app.core.exceptions import NotFoundException
from app.models.admin_user import AdminUser
from app.dependencies.auth import get_current_admin


router = APIRouter(
    prefix="/hero",
    tags=["Hero"]
)


@router.post(
    "/",
    response_model=HeroResponse,
    status_code=status.HTTP_201_CREATED
)
def create_hero(
    hero_data: HeroCreate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    return hero_service.create_hero(
        db,
        hero_data
    )


@router.get(
    "/",
    response_model=HeroResponse
)
def get_hero(
    db: Session = Depends(get_db)
):
    hero = hero_service.get_hero(db)

    if hero is None:
        raise NotFoundException("Hero")

    return hero


@router.patch(
    "/{hero_id}",
    response_model=HeroResponse
)
def update_hero(
    hero_id: UUID,
    hero_data: HeroUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    hero = hero_service.get_hero_by_id(
        db,
        hero_id
    )

    if hero is None:
        raise NotFoundException("Hero")

    return hero_service.update_hero(
        db,
        hero,
        hero_data
    )