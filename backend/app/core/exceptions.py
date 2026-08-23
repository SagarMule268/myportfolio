from fastapi import HTTPException

class AppException(HTTPException):
    """Base exception for the application specific erros"""
    

class NotFoundException(AppException):
    def __init__(self, resource: str ="Resource"):
        super().__init__(
            status_code=404,
            detail=f"{resource} not found"
        )
        
class BadRequestException(AppException):
    def __init__(self, detail:str ="Bad Request"):
        super().__init__(status_code=400, detail=detail)        
        
    
class ConflictException(AppException):
    def __init__(self, status_code, detail:str = "Resource already exists"):
        super().__init__(status_code = 409, detail =detail)
            