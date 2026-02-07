from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    full_name: str


class UserCreate(UserBase):
    password: str
    phone_number: str


class User(UserBase):
    id: str
    
    class Config:
        from_attributes = True
