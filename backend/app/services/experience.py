from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.experience import Experience
from app.schemas.experience import ExperienceCreate, ExperienceUpdate


def create_experience(
    db: Session,
    experience_data: ExperienceCreate,
) -> Experience:
    experience = Experience(
        **experience_data.model_dump()
    )

    db.add(experience)
    db.commit()
    db.refresh(experience)

    return experience


def get_experiences(
    db: Session,
) -> list[Experience]:
    result = db.scalars(
        select(Experience).order_by(
            Experience.start_date.desc()
        )
    )

    return list(result.all())


def get_experience(
    db: Session,
    experience_id: UUID,
) -> Experience | None:
    return db.scalar(
        select(Experience).where(
            Experience.id == experience_id
        )
    )


def update_experience(
    db: Session,
    experience: Experience,
    experience_data: ExperienceUpdate,
) -> Experience:
    update_data = experience_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(experience, field, value)

    db.commit()
    db.refresh(experience)

    return experience


def delete_experience(
    db: Session,
    experience: Experience,
) -> None:
    db.delete(experience)
    db.commit()