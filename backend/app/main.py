from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from fastapi.exceptions import RequestValidationError
from app.core.exception_handlers import(
    general_exception_handler,
    http_exception_handler,
    validation_exception_handler
)
from app.routes.api import api_router
from fastapi import HTTPException

app = FastAPI(
    title="Portfolio V2 API",
    version="0.1.0",
    description="Backend API for Portfolio V2.",
)

# middleware to add the cors 
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# exception handlers
app.add_exception_handler(
    HTTPException,
    http_exception_handler
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)

app.add_exception_handler(
    Exception,
    general_exception_handler
)

# routes
app.include_router(api_router)

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "ok",
        "service": "portfolio-api",
    }