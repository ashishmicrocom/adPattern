from pydantic import BaseModel
from typing import Optional


class CampaignBase(BaseModel):
    name: str
    objective: str
    budget: float


class CampaignCreate(CampaignBase):
    pass


class Campaign(CampaignBase):
    id: str
    user_id: str
    
    class Config:
        from_attributes = True
