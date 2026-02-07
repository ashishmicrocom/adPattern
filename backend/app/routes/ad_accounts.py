from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/ad-accounts", tags=["ad-accounts"])


class AdAccount(BaseModel):
    platform: str
    account_id: str
    access_token: str


@router.post("/connect")
async def connect_account(account: AdAccount):
    """Connect an ad account"""
    return {"message": "Account connected", "platform": account.platform}


@router.get("")
async def list_accounts():
    """List connected ad accounts"""
    return {"accounts": []}
