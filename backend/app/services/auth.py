from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    verify_password,
)
from app.models.admin_user import AdminUser


def authenticate_admin(
    db: Session,
    email: str,
    password: str,
) -> str | None:
    admin = db.scalar(
        select(AdminUser).where(
            AdminUser.email == email
        )
    )

    if admin is None:
        return None

    if not admin.is_active:
        return None

    if not verify_password(
        password,
        admin.hashed_password,
    ):
        return None

    return create_access_token(
        subject=str(admin.id)
    )