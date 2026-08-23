from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class EducationBase(BaseModel):
    institution: str = Field(..., min_length=1, max_length=200)
    degree: str = Field(..., min_length=1, max_length=200)
    field_of_study: str | None = Field(default=None, max_length=200)
    description: str | None = None
    start_date: datetime
    end_date: datetime | None = None


class EducationCreate(EducationBase):
    pass


class EducationUpdate(BaseModel):
    institution: str | None = Field(default=None, min_length=1, max_length=200)
    degree: str | None = Field(default=None, min_length=1, max_length=200)
    field_of_study: str | None = Field(default=None, max_length=200)
    description: str | None = None
    start_date: datetime | None = None
    end_date: datetime | None = None


class EducationResponse(EducationBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime