from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.sage_chat import get_sage_reply

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("/", response_model=ChatResponse)
def chat_with_sage(
    chat_request: ChatRequest,
    db: Session = Depends(get_db),
) -> ChatResponse:
    if chat_request.messages[-1].role != "user":
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="The latest chat message must be from the user.",
        )
    return ChatResponse(reply=get_sage_reply(chat_request, db))
