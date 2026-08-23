from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.skill import(
    SkillCreate,
    SkillUpdate,
    SkillResponse
)
from app.services import skill as skill_service
from app.core.exceptions import NotFoundException
from app.dependencies.auth import get_current_admin
from app.models.admin_user import AdminUser
router =APIRouter(
    prefix="/skill",
    tags=["skills"]
)

# create skill
@router.post(
    "/",
    response_model=SkillResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_skill(skill_data:SkillCreate,db:Session =Depends(get_db),current_admin:AdminUser = Depends(get_current_admin)):
    return skill_service.create_skill(db,skill_data)

# get skills
@router.get(
    "/",
    response_model=list[SkillResponse]
)
def get_skills(db:Session = Depends(get_db)):
    return skill_service.get_skills(db)

# get skill by id

@router.get(
    "/{skill_id}",
    response_model=SkillResponse
)
def get_skill(skill_id:UUID, db:Session = Depends(get_db)):
    skill = skill_service.get_skill(db,skill_id)
    if skill is None:
        raise NotFoundException("Skill")
    return skill

# update skills

@router.patch(
    "/{skill_id}",
    response_model=SkillResponse
) 
def update_skill(skill_id:UUID ,skill_data:SkillUpdate, db:Session= Depends(get_db) ,current_admin:AdminUser = Depends(get_current_admin)):
    skill = skill_service.get_skill(db , skill_id)
    
    if skill is None:
        raise NotFoundException("Skill")
    return skill_service.update_skill(db=db,skill=skill,skill_data=skill_data)

#delete a skill

@router.delete(
    "/{skill_id}",
    status_code=status.HTTP_204_NO_CONTENT
) 
def delete_skill(skill_id:UUID, db:Session = Depends(get_db), current_admin:AdminUser = Depends(get_current_admin)):
    skill = skill_service.get_skill(db, skill_id)
    if skill is None:
        raise NotFoundException("Skill")
    skill_service.delete_skill(db, skill)
    
    
        
