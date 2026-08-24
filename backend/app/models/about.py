from uuid import UUID, uuid4

from sqlalchemy import Boolean, DateTime, String, Text,func
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from app.db.base import Base

class About(Base):
    __tablename__="About"
    
    id:Mapped[UUID]= mapped_column(
        PGUUID(as_uuid=True),
        primary_key=True,
        default=uuid4
    )
    
    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )
    
    description: Mapped[str] =mapped_column(
        String(500),
        nullable=False
        
    )
    
    professional_summary: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )
    
    resume_url :Mapped[str] =mapped_column(
        String(500),
        nullable=False
    )
    profile_image :Mapped[str] =mapped_column(
        String(500),
        nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
            DateTime(timezone=True),
            server_default=func.now(),
            nullable=False,
        )
    
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )