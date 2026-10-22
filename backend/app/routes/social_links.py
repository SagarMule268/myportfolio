from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundException
from app.db.session import get_db
from app.dependencies.auth import get_current_admin
from app.models.admin_user import AdminUser
from app.schemas.social_links import (
    SocialLinkCreate,
    SocialLinkResponse,
    SocialLinkUpdate,
)
from app.services import social_links as social_links_service


router = APIRouter(
    prefix="/social-links",
    tags=["Social links"],
)


@router.get("/", response_model=list[SocialLinkResponse])
def get_social_links(db: Session = Depends(get_db)):
    return social_links_service.get_SocialLinks(db)


@router.post(
    "/",
    response_model=SocialLinkResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_social_link(
    social_link_data: SocialLinkCreate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    return social_links_service.create(db, social_link_data)


@router.patch("/{social_link_id}", response_model=SocialLinkResponse)
def update_social_link(
    social_link_id: UUID,
    social_link_data: SocialLinkUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    social_link = social_links_service.get_by_id(db, social_link_id)
    if social_link is None:
        raise NotFoundException("Social link")
    return social_links_service.update(db, social_link, social_link_data)


@router.delete(
    "/{social_link_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_social_link(
    social_link_id: UUID,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    social_link = social_links_service.get_by_id(db, social_link_id)
    if social_link is None:
        raise NotFoundException("Social link")
    social_links_service.delete(db, social_link)
