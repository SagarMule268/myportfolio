from uuid import UUID
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.skill import Skill
from app.schemas.skill import SkillCreate, SkillResponse, SkillUpdate

# creta a skill

def create_skill(
    db:Session,
    skill_data:SkillCreate
)->Skill:
    skill= Skill(**skill_data.model_dump())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    
    return skill

# get all skills 

def get_skills(
    db:Session
)->Skill:
    result = db.scalars(
        select(Skill).order_by(Skill.created_at.desc())
    )
    return list(result.all())

# get skill by id

def get_skill(
    db:Session,
    skill_id:UUID
)->Skill | None:
    return db.scalar(
        select(Skill).where(
            Skill.id ==skill_id
        )
    ) 
    
    
# update skill
def update_skill(db:Session, skill:Skill , skill_data:SkillUpdate)->Skill:
    update_data = skill_data.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(skill, field, value)
    db.commit()
    db.refresh(skill)    
     
    return skill

#  delete skill
def delete_skill(db:Session, skill:Skill)->None:
    db.delete(skill)
    db.commit()
    
    
         