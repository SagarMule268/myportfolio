from getpass import getpass

from sqlalchemy import select

from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.admin_user import AdminUser


def create_admin() -> None:
    email = input("Admin email: ").strip().lower()
    username = input("Admin username: ").strip()

    password = getpass("Admin password: ")
    confirm_password = getpass("Confirm password: ")

    if password != confirm_password:
        print("Error: passwords do not match.")
        return

    if len(password) < 8:
        print("Error: password must be at least 8 characters.")
        return

    db = SessionLocal()

    try:
        existing_admin = db.scalar(
            select(AdminUser).where(
                (AdminUser.email == email)
                | (AdminUser.username == username)
            )
        )

        if existing_admin:
            print(
                "Error: an admin with this email "
                "or username already exists."
            )
            return

        admin = AdminUser(
            email=email,
            username=username,
            hashed_password=hash_password(password),
            is_active=True,
        )

        db.add(admin)
        db.commit()
        db.refresh(admin)

        print("Admin created successfully.")
        print(f"Admin ID: {admin.id}")
        print(f"Email: {admin.email}")
        print(f"Username: {admin.username}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    create_admin()