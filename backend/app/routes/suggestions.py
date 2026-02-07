from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import pandas as pd
import os
import requests
import tempfile
from pathlib import Path

router = APIRouter()

# Load model data (CSV from notebook)
# Try multiple possible paths for the CSV file
def find_csv_file() -> Optional[str]:
    """Find the CSV file in various possible locations"""
    # Check environment variables first
    env_path = os.getenv('MODEL_CSV_PATH')
    if env_path and os.path.exists(env_path):
        return os.path.abspath(env_path)
    
    # Check for URL download
    env_url = os.getenv('MODEL_CSV_URL')
    if env_url:
        tmp_dir = tempfile.gettempdir()
        tmp_path = os.path.join(tmp_dir, 'adpattern_final_production.csv')
        if not os.path.exists(tmp_path):
            try:
                resp = requests.get(env_url, timeout=30)
                resp.raise_for_status()
                with open(tmp_path, 'wb') as f:
                    f.write(resp.content)
            except Exception as e:
                print(f"[suggestions] Failed to download CSV from URL: {e}")
        if os.path.exists(tmp_path):
            return tmp_path
    
    # Try multiple relative paths from this file's location
    base_dir = Path(__file__).resolve().parent
    possible_paths = [
        base_dir / "../../../adpattern_final_production.csv",  # From routes folder
        base_dir / "../../adpattern_final_production.csv",     # From app folder
        base_dir / "../adpattern_final_production.csv",        # From app folder alt
        Path.cwd() / "adpattern_final_production.csv",         # Current working directory
        Path("adpattern_final_production.csv"),                # Direct path
    ]
    
    for path in possible_paths:
        resolved = path.resolve()
        if resolved.exists():
            return str(resolved)
    
    return None

# Find and load the CSV file
CSV_PATH = find_csv_file()
MODEL_DF: Optional[pd.DataFrame] = None

if CSV_PATH:
    try:
        MODEL_DF = pd.read_csv(CSV_PATH)
        print(f"✅ [suggestions] Successfully loaded model CSV from: {CSV_PATH}")
        print(f"   → Total rows: {len(MODEL_DF)}")
        print(f"   → Categories: {MODEL_DF['Category'].unique().tolist()}")
    except Exception as e:
        print(f"❌ [suggestions] Failed to load CSV from {CSV_PATH}: {e}")
        MODEL_DF = None
else:
    print(f"⚠️  [suggestions] Model CSV file not found! Will return mock data.")
    print(f"   → Searched locations relative to: {Path(__file__).resolve().parent}")
    print(f"   → Current working directory: {Path.cwd()}")

class SuggestionRequest(BaseModel):
    category: Optional[str] = "Clothing"
    user_description: Optional[str] = None
    price: Optional[str] = None
    price_range: Optional[str] = None
    gender: Optional[str] = "Male"
    age_min: Optional[int] = 1
    age_max: Optional[int] = 100
    locations: Optional[str] = None
    target_audience: Optional[str] = None
    platform: Optional[str] = "Meta"  # Platform from model: Meta, Google

class SuggestionResponse(BaseModel):
    headlines: List[str]
    descriptions: List[str]
    keywords: List[str]
    image_prompts: List[str]
    cta: str
    total_matches: int

@router.post("/generate-suggestions", response_model=SuggestionResponse)
async def generate_suggestions(request: SuggestionRequest):
    """
    Generate AI suggestions from model data based on campaign parameters.
    Filters model CSV by category, gender, age range and returns matching headlines/descriptions.
    """
    try:
        # Check if model data is loaded
        if MODEL_DF is None:
            print(f"⚠️  [suggestions] Returning mock data - model not loaded")
            # Return mock data if CSV not found (for development)
            return SuggestionResponse(
                headlines=[
                    "Premium fashion crafted for everyday comfort shop today",
                    "Stylish clothing designed for modern lifestyle explore now",
                    "Elegant apparel tailored for confident look discover more"
                ],
                descriptions=[
                    "Experience premium clothing that combines style and comfort for everyday wear",
                    "Modern fashion collection designed for confident individuals",
                    "Discover elegant apparel crafted for your active lifestyle"
                ],
                keywords=["premium", "fashion", "clothing", "style", "comfort"],
                image_prompts=[
                    "Premium stylish clothing photoshoot",
                    "Modern fashion apparel lifestyle",
                    "Elegant comfortable wear collection"
                ],
                cta="Shop Now",
                total_matches=0
            )
        
        # Use the pre-loaded DataFrame
        df = MODEL_DF.copy()
        
        # Filter by category
        filtered_df = df[df['Category'] == request.category]
        
        # Filter by platform (model has Platform column: Meta, Google)
        if request.platform:
            filtered_df = filtered_df[filtered_df['Platform'] == request.platform]
        
        # Filter by gender (if model has specific gender, match it; "All" in frontend maps to any gender in model)
        if request.gender and request.gender != "All":
            filtered_df = filtered_df[filtered_df['Gender'] == request.gender]
        
        # Filter by age range (model has Age_Min and Age_Max)
        if request.age_min and request.age_max:
            # Find rows where the age ranges overlap
            filtered_df = filtered_df[
                (filtered_df['Age_Min'] <= request.age_max) & 
                (filtered_df['Age_Max'] >= request.age_min)
            ]
        
        # If locations specified, try to find matching locations (model has comma-separated Locations)
        if request.locations:
            user_locations = [loc.strip().lower() for loc in request.locations.split(',')]
            # Filter rows where any location matches
            def location_matches(row_locations):
                if pd.isna(row_locations):
                    return False
                model_locations = [loc.strip().lower() for loc in str(row_locations).split(',')]
                return any(loc in model_locations for loc in user_locations)
            
            filtered_df = filtered_df[filtered_df['Locations'].apply(location_matches)]
        
        # If no matches found, use all data from same category
        if len(filtered_df) == 0:
            filtered_df = df[df['Category'] == request.category]
        
        # If still no matches, use all data
        if len(filtered_df) == 0:
            filtered_df = df
        
        # Get headlines, descriptions, keywords, and prompts (up to 10 items)
        # Don't use unique() since each product should have 10 distinct ads
        # Just limit the results to avoid too much data
        headlines = filtered_df['Headline'].dropna().head(10).tolist()
        descriptions = filtered_df['Ad_Description'].dropna().head(10).tolist()
        keywords = filtered_df['Keyword'].dropna().head(10).tolist()
        image_prompts = filtered_df['Image_Prompt'].dropna().head(10).tolist()
        
        # Determine CTA based on price
        cta = "Shop Now" if request.price or request.price_range else "Learn More"
        
        return SuggestionResponse(
            headlines=headlines,
            descriptions=descriptions,
            keywords=keywords,
            image_prompts=image_prompts,
            cta=cta,
            total_matches=len(filtered_df)
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating suggestions: {str(e)}")

@router.get("/model-stats")
async def get_model_stats():
    """Get statistics about the model data"""
    try:
        if MODEL_DF is None:
            return {
                "error": "Model CSV not loaded",
                "csv_path": CSV_PATH,
                "csv_exists": False,
                "searched_paths": [
                    str(Path(__file__).resolve().parent / "../../../adpattern_final_production.csv"),
                    str(Path.cwd() / "adpattern_final_production.csv")
                ]
            }
        
        return {
            "status": "loaded",
            "total_rows": len(MODEL_DF),
            "total_users": int(MODEL_DF['User_ID'].nunique()),
            "categories": MODEL_DF['Category'].unique().tolist(),
            "genders": MODEL_DF['Gender'].unique().tolist(),
            "platforms": MODEL_DF['Platform'].unique().tolist(),
            "age_range": f"{int(MODEL_DF['Age_Min'].min())} - {int(MODEL_DF['Age_Max'].max())}",
            "unique_headlines": int(MODEL_DF['Headline'].nunique()),
            "unique_descriptions": int(MODEL_DF['Ad_Description'].nunique()),
            "csv_path": CSV_PATH,
            "csv_exists": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
