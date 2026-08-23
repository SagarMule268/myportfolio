from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.project import (
    ProjectCreate,
    ProjectResponse,
    ProjectUpdate,
)
from app.services import project as project_service
from app.core.exceptions import NotFoundException
from app.dependencies.auth import get_current_admin
from app.models.admin_user import AdminUser
router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.post(
    "/",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_project(
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    return project_service.create_project(
        db,
        project_data,
    )


@router.get(
    "/",
    response_model=list[ProjectResponse],
)
def get_projects(
    db: Session = Depends(get_db),
):
    return project_service.get_projects(db)


@router.get(
    "/{project_id}",
    response_model=ProjectResponse,
)
def get_project(
    project_id: UUID,
    db: Session = Depends(get_db),
):
    project = project_service.get_project(
        db,
        project_id,
    )

    if project is None:
        raise NotFoundException("Project")

    return project


@router.patch(
    "/{project_id}",
    response_model=ProjectResponse,
)
def update_project(
    project_id: UUID,
    project_data: ProjectUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    project = project_service.get_project(
        db,
        project_id,
    )

    if project is None:
        raise NotFoundException("Project")
    return project_service.update_project(
        db,
        project,
        project_data,
    )


@router.delete(
    "/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_project(
    project_id: UUID,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    project = project_service.get_project(
        db,
        project_id,
    )

    if project is None:
        raise NotFoundException("Project")

    project_service.delete_project(
        db,
        project,
    )