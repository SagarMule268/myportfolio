from io import BytesIO
from pathlib import Path

import cloudinary.uploader
from fastapi import UploadFile
from starlette.concurrency import run_in_threadpool

from app.core.cloudinary import cloudinary

ALLOWED_CONTENT_TYPES = {
    "image/jpeg": {".jpg", ".jpeg"},
    "image/png": {".png"},
    "image/webp": {".webp"},
    "application/pdf": {".pdf"},
    "application/msword": {".doc"},
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {".docx"},
}

MAX_FILE_SIZE = 5 * 1024 * 1024
FILE_SIGNATURES = {
    "image/jpeg": lambda content: content.startswith(b"\xff\xd8\xff"),
    "image/png": lambda content: content.startswith(b"\x89PNG\r\n\x1a\n"),
    "image/webp": lambda content: content.startswith(b"RIFF") and content[8:12] == b"WEBP",
    "application/pdf": lambda content: content.startswith(b"%PDF-"),
    "application/msword": lambda content: content.startswith(b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1"),
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": lambda content: content.startswith(b"PK\x03\x04"),
}


async def upload_file(file: UploadFile) -> dict:
    try:
        content = await file.read(MAX_FILE_SIZE + 1)
        if not content:
            raise ValueError("The uploaded file is empty.")

        if len(content) > MAX_FILE_SIZE:
            raise ValueError("File size must not exceed 5 MB.")

        content_type = file.content_type or ""
        extension = Path(file.filename or "").suffix.lower()
        allowed_extensions = ALLOWED_CONTENT_TYPES.get(content_type)
        if allowed_extensions is None or extension not in allowed_extensions:
            raise ValueError(
                "Only JPEG, PNG, WebP, PDF, DOC, and DOCX files are allowed."
            )

        if not FILE_SIGNATURES[content_type](content):
            raise ValueError("The file content does not match its declared type.")

        resource_type = "image" if content_type.startswith("image/") else "raw"
        upload_buffer = BytesIO(content)
        upload_buffer.name = file.filename or "upload"
        result = await run_in_threadpool(
            cloudinary.uploader.upload,
            upload_buffer,
            resource_type=resource_type,
            folder="SRM_portfolio",
            use_filename=False,
            unique_filename=True,
        )

        return {
            "public_id": result["public_id"],
            "url": result["secure_url"],
            "resource_type": result["resource_type"],
            "format": result.get("format"),
            "bytes": result["bytes"],
        }
    finally:
        await file.close()