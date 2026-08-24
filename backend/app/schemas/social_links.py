from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class SocialLinkBase(BaseModel):
    label : str =Field(...,min_length=1, max_length=100)
    platform :str = Field(...,min_length=1, max_length=100)
    icon :str = Field(...,min_length=1, max_length=50)
    url : str =Field(...,max_length=1,max_length=100)
    is_visible :bool |None = True



class SocialLinkCreate(SocialLinkBase):
    pass


class SocialLinkUpdate(SocialLinkBase):
    label : str |None  =Field(default=None,min_length=1, max_length=50)
    platform :str |None = Field(default=None,min_length=1, max_length=50)
    icon :str|None  = Field(default=None,min_length=1, max_length=50)
    url : str |None =Field(default=None,max_length=1,max_length=100)
    is_visible :bool |None =True


class SocialLinkResponse(SocialLinkBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime