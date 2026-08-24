from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class AboutBase(BaseModel):
    title : str =Field(...,min_length=1, max_length=200)
    description :str = Field(...,min_length=1, max_length=500)
    professional_summary :str = Field(...,min_length=1, max_length=500)
    resume_url : str =Field(...,max_length=1,max_length=500)
    profile_image :str |None =None



class AboutCreate(AboutBase):
    pass


class AboutUpdate(AboutBase):
    title : str |None  =Field(default=None,min_length=1, max_length=200)
    description :str |None = Field(default=None,min_length=1, max_length=500)
    professional_summary :str|None  = Field(default=None,min_length=1, max_length=500)
    resume_url : str |None =Field(default=None,max_length=1,max_length=500)
    profile_image :str |None =None


class AboutResponse(AboutBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime