from uuid import UUID
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.social_links import SocialLinks
from app.schemas.social_links import SocialLinkCreate, SocialLinkUpdate

def create(
    db:Session,
    data:SocialLinkCreate
)->SocialLinks:
    socialLink = SocialLinks(**data.model_dump())
    db.add(socialLink)
    db.commit()
    db.refresh(socialLink)
    return socialLink

def get_SocialLinks(
    db:Session
)->list[SocialLinks]:
    result = db.scalars(
        select(SocialLinks)
    )
    return list(result.all())


def get_by_id(
    db: Session,
    social_link_id: UUID,
) -> SocialLinks | None:
    return db.scalar(
        select(SocialLinks).where(SocialLinks.id == social_link_id)
    )


def update(
    db: Session,
    social_link: SocialLinks,
    data: SocialLinkUpdate,
) -> SocialLinks:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(social_link, field, value)

    db.commit()
    db.refresh(social_link)
    return social_link


def delete(
    db: Session,
    social_link: SocialLinks,
) -> None:
    db.delete(social_link)
    db.commit()
