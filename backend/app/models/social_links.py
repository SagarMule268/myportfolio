from uuid import UUID, uuid4

from sqlalchemy import Boolean, DateTime, String, Text, func
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from app.db.base import Base

class SocialLinks(Base):
    __tablename__="social_links"
    
    id: Mapped[UUID] = mapped_column(
            PGUUID(as_uuid=True),
            primary_key=True,
            default=uuid4,
        )
    
    label: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )
    
    platform: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )
    icon: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )
    
    url:Mapped[str] =mapped_column(
        String(500),
        nullable=False
    )
    
    is_visible: Mapped[bool] = mapped_column(
    Boolean,
    default=True,
    nullable=False,
    )
    