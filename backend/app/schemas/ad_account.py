from pydantic import BaseModel


class AdAccountBase(BaseModel):
    platform: str
    account_id: str


class AdAccountCreate(AdAccountBase):
    access_token: str


class AdAccount(AdAccountBase):
    id: str
    user_id: str
    
    class Config:
        from_attributes = True
