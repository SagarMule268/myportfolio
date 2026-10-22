from uuid import UUID
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.hero import Hero
from app.schemas.hero import HeroCreate, HeroUpdate, HeroResponse

# create  a Hero section
def create_hero(
    db:Session,
    hero_data:HeroCreate
)->Hero:
    hero = Hero(**hero_data.model_dump())
    db.add(hero)
    db.commit()
    db.refresh(hero)
    
    return hero


def get_hero(
    db:Session
)->Hero:
    result =db.scalar(
        select(Hero).order_by(Hero.updated_at)
    )
    
    return result

def get_hero_by_id(
    db:Session,
    hero_id:UUID
    
)->Hero:
    result =db.scalar(
        select(Hero).where(Hero.id == hero_id)
    )
    
    return result

def update_hero(
    db:Session,
    hero:Hero,
    hero_data:HeroUpdate
)->Hero :
    update_data = hero_data.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(hero, field, value)
        
    db.commit()
    db.refresh(hero)
    return hero    

