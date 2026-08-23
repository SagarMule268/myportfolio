from uuid import UUID
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate


def create_project(
    db: Session,
    project_data: ProjectCreate,
) -> Project:
    project = Project(**project_data.model_dump())

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


def get_projects(
    db: Session,
) -> list[Project]:
    result = db.scalars(
        select(Project).order_by(Project.created_at.desc())
    )

    return list(result.all())


def get_project(
    db: Session,
    project_id: UUID,
) -> Project | None:
    return db.scalar(
        select(Project).where(Project.id == project_id)
    )


def update_project(
    db: Session,
    project: Project,
    project_data: ProjectUpdate,
) -> Project:
    update_data = project_data.model_dump(
        exclude_unset=True,
    )

    for field, value in update_data.items():
        setattr(project, field, value)

    db.commit()
    db.refresh(project)

    return project


def delete_project(
    db: Session,
    project: Project,
) -> None:
    db.delete(project)
    db.commit()