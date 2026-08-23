from uuid import UUID
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.contact_message import ContactMessage
from app.schemas.contact_message import ContactMessageCreate, ContactMessageResponse

# crate a message

def create_contact_message(db:Session, contact_message_data:ContactMessageCreate)->ContactMessage:
    contact_message = ContactMessage(**contact_message_data.model_dump())
    db.add(contact_message)
    db.commit()
    db.refresh(contact_message)
    return contact_message

# get contact messages

def get_contact_messages(db:Session)->list[ContactMessage]:
    result = db.scalars(
        select(ContactMessage).order_by(ContactMessage.created_at.desc())
        
    )
    
    return list(result.all())

# get contact message by id
def get_contact_message(db:Session,contact_message_id:UUID)->ContactMessage |None:
    
    return db.scalar(
        select(ContactMessage).where(ContactMessage.id == contact_message_id)
        
    )

# delete the contact message

def delete_contact_message(db:Session, contact_message:ContactMessage)->None:
    db.delete(contact_message)
    db.commit() 
    