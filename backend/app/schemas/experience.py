from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ExperienceBase(BaseModel):
    company: str = Field(..., min_length=1, max_length=200)
    position: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1)
    location: str | None = Field(default=None, max_length=200)
    start_date: datetime
    end_date: datetime | None = None
    is_current: bool = False


class ExperienceCreate(ExperienceBase):
    pass


class ExperienceUpdate(BaseModel):
    company: str | None = Field(default=None, min_length=1, max_length=200)
    position: str | None = Field(default=None, min_length=1, max_length=200)
    description: str | None = Field(default=None, min_length=1)
    location: str | None = Field(default=None, max_length=200)
    start_date: datetime | None = None
    end_date: datetime | None = None
    is_current: bool | None = None


class ExperienceResponse(ExperienceBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime