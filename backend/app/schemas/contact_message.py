from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    subject: str | None = Field(default=None, max_length=300)
    message: str = Field(..., min_length=1)


class ContactMessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    email: EmailStr
    subject: str | None
    message: str
    is_read: bool
    created_at: datetime