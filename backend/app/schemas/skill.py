from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class SkillBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    category: str | None = Field(default=None, max_length=100)
    proficiency: int | None = Field(default=None, ge=1, le=100)
    icon_url: str | None = Field(default=None, max_length=500)
    featured: bool = False


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)
    category: str | None = Field(default=None, max_length=100)
    proficiency: int | None = Field(default=None, ge=1, le=100)
    icon_url: str | None = Field(default=None, max_length=500)
    featured: bool | None = None


class SkillResponse(SkillBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime