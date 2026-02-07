from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/api/campaigns", tags=["campaigns"])


class Campaign(BaseModel):
    name: str
    objective: str
    budget: float


@router.post("/create")
async def create_campaign(campaign: Campaign):
    """Create a new campaign"""
    return {"message": "Campaign created", "campaign": campaign}


@router.get("")
async def list_campaigns():
    """List all campaigns"""
    return {"campaigns": []}


@router.put("/{campaign_id}")
async def update_campaign(campaign_id: str, campaign: Campaign):
    """Update a campaign"""
    return {"message": "Campaign updated", "id": campaign_id}


@router.delete("/{campaign_id}")
async def delete_campaign(campaign_id: str):
    """Delete a campaign"""
    return {"message": "Campaign deleted", "id": campaign_id}
