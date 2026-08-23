from uuid import UUID
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.education import Education
from app.schemas.education import EducationCreate, EducationResponse, EducationUpdate


# create education

def create_education(
    db:Session,
    education_data:EducationCreate
)->Education:
    education = Education(**education_data.model_dump())
    db.add(education)
    db.commit()
    db.refresh(education)
    
    return education

# get all educations
def get_educations(
    db:Session,
    )->Education:
    result = db.scalars(
        select(Education).order_by(Education.start_date.desc())
    )
    return list(result.all())

# get education by id
def get_education(
    db:Session,
    education_id:UUID
)->Education |None :
    return db.scalar(
        select(Education).where(
            Education.id == education_id
        )
    )

# update education

def update_education(
    db:Session,
    education:Education,
    education_data:EducationUpdate
) ->Education :
    update_data = education_data.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(education, field, value)
    
    db.commit()
    db.refresh(education)
    
    return education

# delete education
def delete_education(
    db:Session,
    education:Education,
) ->None:
    db.delete(education)
    db.commit()
    
    
    
    
    
    