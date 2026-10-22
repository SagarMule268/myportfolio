from uuid import UUID
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.about import About
from app.schemas.about import AboutCreate, AboutUpdate

def create_about(
    db:Session,
    about_data:AboutCreate
)->About:
    about = About(**about_data.model_dump())
    db.add(about)
    db.commit()
    db.refresh(about)
    return about

def get_about(
    db:Session
)->About | None:
    result =db.scalar(
        select(About)
    )
    return result

def update_about(
    db:Session,
    about:About,
    about_data:AboutUpdate
)->About:
    update_data = about_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(about,field,value)
    
    db.commit()
    db.refresh(about)
    
    return about

def get_about_by_id(
    db:Session,
    about_id:UUID
)->About | None:
    return db.scalar(
        select(About).where(About.id == about_id)
    )    
    
    

    