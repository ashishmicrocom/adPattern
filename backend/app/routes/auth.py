from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from app.config.settings import settings

router = APIRouter(prefix="/api/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    phone_number: str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


@router.post("/register", response_model=TokenResponse)
async def register(user: UserRegister):
    """Register a new user"""
    # In production, save to database and check for duplicates
    hashed_password = pwd_context.hash(user.password)
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user.email, "name": user.full_name}
    )
    
    return TokenResponse(access_token=access_token)


@router.post("/login/json", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """Login user"""
    # In production, verify against database
    # For now, accept any login for demo
    
    access_token = create_access_token(
        data={"sub": credentials.email}
    )
    
    return TokenResponse(access_token=access_token)
