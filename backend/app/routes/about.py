from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundException
from app.db.session import get_db
from app.dependencies.auth import get_current_admin
from app.models.admin_user import AdminUser
from app.schemas.about import AboutCreate, AboutResponse, AboutUpdate
from app.services import about as about_service


router = APIRouter(
    prefix="/about",
    tags=["About"],
)


@router.get("/", response_model=AboutResponse)
def get_about(db: Session = Depends(get_db)):
    about = about_service.get_about(db)
    if about is None:
        raise NotFoundException("About")
    return about


@router.post(
    "/",
    response_model=AboutResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_about(
    about_data: AboutCreate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    return about_service.create_about(db, about_data)


@router.patch("/{about_id}", response_model=AboutResponse)
def update_about(
    about_id: UUID,
    about_data: AboutUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    about = about_service.get_about_by_id(db, about_id)
    if about is None:
        raise NotFoundException("About")
    return about_service.update_about(db, about, about_data)
