from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.experience import (
    ExperienceCreate,
    ExperienceResponse,
    ExperienceUpdate,
)

from app.services import experience as experience_service
from app.core.exceptions import NotFoundException
from app.dependencies.auth import get_current_admin
from app.models.admin_user import AdminUser
router = APIRouter(
    prefix="/experience",
    tags=["Experience"]
)

# create experience
@router.post(
    "/",
    response_model=ExperienceResponse,
    status_code=status.HTTP_201_CREATED
    )

def create_experience(experience_data: ExperienceCreate, db:Session = Depends(get_db),current_admin:AdminUser = Depends(get_current_admin)):
    return experience_service.create_experience(db, experience_data)


# get experiences

@router.get(
    "/",
    response_model=list[ExperienceResponse]
    )

def get_experiences(db:Session = Depends(get_db)):
    return experience_service.get_experiences(db)


#get experience by ID

@router.get("/{experience_id}",response_model=ExperienceResponse)

def get_experience(experience_id:UUID, db:Session = Depends(get_db)):
    experience = experience_service.get_experience(db,experience_id)
    
    if experience is None:
        raise NotFoundException("Experience")
    return experience

# update experience

@router.patch(
    "/{experience_id}",
    response_model=ExperienceResponse
)

def update_experience( 
    experience_id:UUID,
    experience_data:ExperienceUpdate,
    db:Session=Depends(get_db),
    current_admin:AdminUser = Depends(get_current_admin)):
    
    experience = experience_service.get_experience(db,experience_id)
    
    if experience is None:
        raise NotFoundException("Experience")
    return experience_service.update_experience(
        db,
        experience,
        experience_data
    )

# delete experience

@router.delete(
    "/{experience_id}",
    status_code=status.HTTP_204_NO_CONTENT
) 

def delete_experience(
    experience_id:UUID,
    db:Session = Depends(get_db),
    current_admin:AdminUser = Depends(get_current_admin)
):
    experience = experience_service.get_experience(db,experience_id)
    if experience is None:
        raise NotFoundException("Experience")
    experience_service.delete_experience(db, experience)
    

        
        
    
    
    

