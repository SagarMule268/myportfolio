from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.contact_message import(
    ContactMessageCreate,
    ContactMessageResponse
)
from app.services import contact_message as contact_message_service
from app.core.exceptions import NotFoundException
from app.models.admin_user import AdminUser
from app.dependencies.auth import get_current_admin
router = APIRouter(
    prefix="/contact-message",
    tags=["Contact Messgae"]
)

# create a message
@router.post(
    "/",
    response_model=ContactMessageResponse,
    status_code=status.HTTP_201_CREATED    
)
def create_contact_message(contact_message_data:ContactMessageCreate, db:Session=Depends(get_db)):
    return contact_message_service.create_contact_message(db, contact_message_data)

# get all contact messages
@router.get(
    "/",
    response_model=list[ContactMessageResponse],
) 
def get_contact_messages(db:Session = Depends(get_db),current_admin:AdminUser = Depends(get_current_admin)):
    return contact_message_service.get_contact_messages(db=db)

# get contact message by Id
@router.get(
    "/{contact_message_id}",
    response_model=ContactMessageResponse
)
def get_contact_message(contact_message_id:UUID, db:Session = Depends(get_db),current_admin:AdminUser = Depends(get_current_admin)):
    contact_message = contact_message_service.get_contact_message(db, contact_message_id)
    if contact_message is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="contact message not found"
        )
    return contact_message

    

#delete the contact message
@router.delete(
    "/{contact_message_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_contact_message(contact_message_id:UUID,db:Session = Depends(get_db), current_admin:AdminUser = Depends(get_current_admin) ):
    contact_message = contact_message_service.get_contact_message(db, contact_message_id)
    if contact_message is None:
        raise NotFoundException("contact message")
    contact_message_service.delete_contact_message(db,contact_message)

        