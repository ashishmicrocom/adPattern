from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import settings


class Database:
    client: AsyncIOMotorClient = None
    
    async def connect_db(self):
        """Connect to MongoDB"""
        try:
            self.client = AsyncIOMotorClient(settings.mongodb_uri)
            await self.client.admin.command('ping')
            print(f"✅ Connected to MongoDB: {settings.database_name}")
        except Exception as e:
            print(f"❌ Error connecting to MongoDB: {str(e)[:200]}")
            raise
    
    async def close_db(self):
        """Close MongoDB connection"""
        if self.client:
            self.client.close()
            print("✅ MongoDB connection closed")
    
    def get_database(self):
        """Get database instance"""
        return self.client[settings.database_name]


db = Database()
