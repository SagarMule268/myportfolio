from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field

class HeroBase(BaseModel):
    greeting:str = Field(...,min_length=1, max_length=200)
    title   :str = Field(...,min_length=1,max_length=200)
    subtitle:str = Field(...,min_length=1, max_length=200)
    description :str =Field(...,min_length=10, max_length=400)
    profile_image:str |None =None
    primary_cta : dict |None =None
    secondary_cta: dict |None =None
    
    
class HeroCreate(HeroBase):
    pass 

class HeroUpdate(HeroBase):
    greeting:str |None = Field(default=None,min_length=1, max_length=200)
    title   :str  |None = Field(default=None,min_length=1,max_length=200)
    subtitle:str |None = Field(default=None,min_length=1, max_length=200)
    description :str |None =Field(default=None,min_length=10, max_length=400)
    profile_image:str |None =None
    primary_cta : dict |None =None
    secondary_cta: dict |None =None
    
    
class HeroResponse(HeroBase):
    model_config =ConfigDict(from_attributes=True)
    id:UUID
    created_at:datetime
    updated_at:datetime
        
        
