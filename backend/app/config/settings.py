from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    # App Info
    app_name: str = "AdPatterns API"
    app_version: str = "1.0.0"
    debug: bool = True
    
    # Server
    host: str = "0.0.0.0"
    port: int = int(os.getenv("PORT", "8000"))
    
    # Database
    mongodb_uri: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017/adpatterns")
    database_name: str = "adpatterns"
    
    # Security
    jwt_secret_key: str = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24 * 7  # 7 days
    
    # CORS
    allowed_origins_list: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001", 
        "https://*.vercel.app",
        "https://*.railway.app"
    ]
    allowed_origins_regex: str = r"https://.*\.vercel\.app|https://.*\.railway\.app"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
