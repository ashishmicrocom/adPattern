# Deployment Guide for AdPatterns

## Overview
This guide explains how to deploy the AdPatterns application with the ML model data properly configured.

## Important: Model CSV File

The backend requires the `adpattern_final_production.csv` file to serve real AI-generated ad suggestions. Without this file, the API will return mock data.

### Option 1: Include CSV in Repository (Recommended for Railway)

1. **Ensure CSV is in repo root**: The file `adpattern_final_production.csv` should be at the root of your repository
2. **Check .gitignore**: Make sure `*.csv` is NOT in your `.gitignore` if you want to include it
3. **Commit and push**:
   ```bash
   git add adpattern_final_production.csv
   git commit -m "Add model CSV file"
   git push
   ```

### Option 2: Use Environment Variable with URL

If the CSV file is too large for git, host it separately and use an environment variable:

1. Upload `adpattern_final_production.csv` to cloud storage (AWS S3, Google Cloud Storage, etc.)
2. Get a public URL for the file
3. Set environment variable in your deployment platform:
   ```
   MODEL_CSV_URL=https://your-bucket.s3.amazonaws.com/adpattern_final_production.csv
   ```

### Option 3: Use Environment Variable with Path

If your deployment platform supports persistent storage:

1. Upload the CSV to your deployment environment
2. Set the path as an environment variable:
   ```
   MODEL_CSV_PATH=/app/adpattern_final_production.csv
   ```

## Railway Deployment (Backend)

### 1. Prepare the Repository
```bash
cd backend
```

### 2. Deploy to Railway
1. Connect your GitHub repository to Railway
2. Select the `backend` folder as the root directory
3. Railway will auto-detect Python and install dependencies

### 3. Configure Environment Variables
Add these in Railway dashboard → Variables:

**Required:**
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET_KEY` - A random secret key for JWT tokens
- `NEXT_PUBLIC_API_URL` - Your Railway backend URL (e.g., `https://your-app.up.railway.app`)

**For Model CSV (choose one):**
- `MODEL_CSV_URL` - URL to download the CSV file
- `MODEL_CSV_PATH` - Path to CSV file in deployment

**Optional:**
- `DEBUG` - Set to `false` in production

### 4. Verify Deployment
After deployment, visit:
```
https://your-railway-app.up.railway.app/api/model-stats
```

You should see:
```json
{
  "status": "loaded",
  "total_rows": 100000,
  "csv_exists": true,
  ...
}
```

If you see `"error": "Model CSV not loaded"`, the CSV file is not accessible.

## Vercel Deployment (Frontend)

### 1. Prepare the Repository
```bash
cd frontend
```

### 2. Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Select the `frontend` folder as the root directory
3. Vercel will auto-detect Next.js

### 3. Configure Environment Variables
Add these in Vercel dashboard → Settings → Environment Variables:

**Required:**
- `NEXT_PUBLIC_API_URL` - Your Railway backend URL (e.g., `https://your-app.up.railway.app`)

### 4. Redeploy
After adding environment variables, trigger a new deployment to apply changes.

## Troubleshooting

### Frontend shows mock data

**Problem**: The frontend is displaying generic mock data instead of data from your model.

**Solution**:

1. **Check backend logs** (Railway dashboard → Deployments → Logs):
   - Look for: `✅ [suggestions] Successfully loaded model CSV`
   - If you see: `⚠️ [suggestions] Model CSV file not found!` - the CSV is not accessible

2. **Verify API endpoint**:
   ```bash
   curl https://your-railway-app.up.railway.app/api/model-stats
   ```
   
3. **Check frontend API_URL**:
   - Open browser DevTools → Network tab
   - Make a campaign and check if requests go to Railway or localhost
   - If they go to localhost, add `NEXT_PUBLIC_API_URL` in Vercel

4. **Test backend directly**:
   ```bash
   curl -X POST https://your-railway-app.up.railway.app/api/generate-suggestions \
     -H "Content-Type: application/json" \
     -d '{"category":"Clothing","gender":"Male","platform":"Meta"}'
   ```
   Check if `total_matches` > 0 in response

### CSV file not loading on Railway

**Solutions**:

1. **Verify CSV is in repository**:
   ```bash
   git ls-files | grep adpattern_final_production.csv
   ```
   
2. **Check file is being deployed** (Railway logs):
   ```
   ls -la adpattern_final_production.csv
   ```

3. **Use URL method** if file is too large:
   - Upload to S3/Google Cloud Storage
   - Set `MODEL_CSV_URL` environment variable
   - Redeploy

4. **Check Railway build logs** for any errors during CSV loading

### CORS errors

If you see CORS errors in browser console:

1. Verify `NEXT_PUBLIC_API_URL` in Vercel points to Railway
2. Check Railway backend logs for CORS configuration
3. Ensure Railway app is running and accessible

## Local Development

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The CSV file should automatically be found at the repository root when running locally.

## Production Checklist

Before deploying to production:

- [ ] CSV file is accessible (in repo or via URL)
- [ ] MongoDB is set up and `MONGODB_URI` is configured
- [ ] `JWT_SECRET_KEY` is set to a strong random value
- [ ] `NEXT_PUBLIC_API_URL` in Vercel points to Railway backend
- [ ] Backend `/api/model-stats` returns `"csv_exists": true`
- [ ] Frontend can make successful API calls to backend
- [ ] CORS is properly configured
- [ ] Test end-to-end: create product → generate campaign → verify data is from model

## Support

If you encounter issues:

1. Check Railway logs for backend errors
2. Check Vercel logs for frontend build errors
3. Use browser DevTools Network tab to inspect API calls
4. Visit `/api/model-stats` to verify model loading
