from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.education import(
    EducationCreate,
    EducationResponse,
    EducationUpdate
)

from app.services import education as education_service
from app.core.exceptions import NotFoundException
from app.models.admin_user import AdminUser
from app.dependencies.auth import get_current_admin
router = APIRouter(
    prefix="/education",
    tags=["Education"]
)

# create a education
@router.post(
    "/",
    response_model=EducationResponse,
    status_code=status.HTTP_201_CREATED
)
def create_education(education_data:EducationCreate, db:Session = Depends(get_db),current_admin:AdminUser = Depends(get_current_admin)):
    return education_service.create_education(db,education_data)

# get educations

@router.get(
    "/",
    response_model=list[EducationResponse]
)
def get_educations(db:Session = Depends(get_db)):
    return education_service.get_educations(db)

# get education by id
@router.get(
    "/{education_id}",
    response_model=EducationResponse
)
def get_education(education_id:UUID , db:Session = Depends(get_db)):
    education = education_service.get_education(db, education_id)
    
    if education is None:
        raise NotFoundException("Education")
    return education

# update education
@router.patch(
    "/{education_id}",
    response_model=EducationResponse
) 
def update_education(education_id:UUID,education_data:EducationUpdate, db:Session = Depends(get_db),current_admin:AdminUser = Depends(get_current_admin)):
    education = education_service.get_education(db, education_id)
    if education is None:
        raise NotFoundException("Education")
    return education_service.update_education(db,education,education_data)

# delete the education

@router.delete(
    "/{education_id}",
    status_code=status.HTTP_204_NO_CONTENT
) 
def delete_education(
    education_id:UUID,
    db:Session = Depends(get_db),
    current_admin:AdminUser = Depends(get_current_admin)
):
    education = education_service.get_education(db, education_id)
    if education is None:
        raise NotFoundException("Education")
    
    education_service.delete_education(db,education)
    
         
    
