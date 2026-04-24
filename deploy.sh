#!/bin/bash

# Configuration
SERVICE_NAME="matmitra"
REGION="europe-west1"
PROJECT_ID=$(gcloud config get-value project)

echo "🚀 Starting deployment for $SERVICE_NAME in $PROJECT_ID..."

# 1. Build and Push to Artifact Registry/GCR
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME .

# 2. Deploy to Cloud Run
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-secrets GEMINI_API_KEY=gemini-api-key:latest \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10

echo "✅ Deployment complete!"
gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format 'value(status.url)'
