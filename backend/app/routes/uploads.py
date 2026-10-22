from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.dependencies.auth import get_current_admin
from app.models.admin_user import AdminUser
from app.services.file_upload import upload_file

router = APIRouter(
    prefix="/uploads",
    tags=["Uploads"],
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_upload(
    file: UploadFile = File(...),
    current_admin: AdminUser = Depends(get_current_admin),
):
    try:
        return await upload_file(file)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        ) from error
