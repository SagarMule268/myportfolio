import logging
from fastapi import HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

logger = logging.getLogger(__name__)

async def http_exception_handler(
    request:Request,
    exc:HTTPException,
)->JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success":False,
            "error":{
                "code":exc.status_code,
                "message":exc.detail,
            }
        }
    )
    

async def validation_exception_handler(
    request:Request,
    exc: RequestValidationError
)->JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
        content={
            "success":False,
            "error":{
                "code":status.HTTP_422_UNPROCESSABLE_CONTENT,
                "message":"Validation error",
                "details":exc.errors(),
            }
        }
    )
    
async def general_exception_handler(
    request: Request,
    exc:Exception
)->JSONResponse:
    logger.exception("unhandled exception occurred: %s",exc)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success":False,
            "error":{
                "code":status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message":"Internal server error"
            }
        }
    ) 
     