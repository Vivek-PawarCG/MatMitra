# MatMitra — Google Cloud Run Deployment Guide 🚀

Follow these steps to deploy your multi-service Indian Election Education platform to Google Cloud.

## 🏗️ 1. GCP Project Preparation
Ensure you have a Google Cloud Project and the `gcloud` CLI installed and authenticated.

1.  **Enable Required APIs**:
    ```bash
    gcloud services enable run.googleapis.com \
                           cloudbuild.googleapis.com \
                           secretmanager.googleapis.com \
                           aiplatform.googleapis.com \
                           bigquery.googleapis.com \
                           logging.googleapis.com \
                           monitoring.googleapis.com
    ```
2.  **Authenticate**:
    ```bash
    gcloud auth login
    gcloud config set project [YOUR_PROJECT_ID]
    ```

## 🔐 2. Secret Manager Setup (Crucial)
The app is configured to fetch the Gemini API Key from Secret Manager for security.

1.  **Create the Secret**:
    ```bash
    echo -n "YOUR_GEMINI_API_KEY" | gcloud secrets create gemini-api-key --data-file=-
    ```
2.  **Grant Access**:
    Give the Compute Engine default service account (used by Cloud Run) access to read this secret:
    ```bash
    PROJECT_NUMBER=$(gcloud projects describe $(gcloud config get-value project) --format='value(projectNumber)')
    
    gcloud secrets add-iam-policy-binding gemini-api-key \
      --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
      --role="roles/secretmanager.secretAccessor"
    ```

## 📦 3. Firestore & BigQuery Setup
1.  **Firestore**:
    - Go to the GCP Console -> Firestore.
    - Create a database in **Native Mode**.
    - Choose a region close to your users (e.g., `asia-south1`).
2.  **BigQuery**:
    - Go to BigQuery Console.
    - Create a Dataset named `matmitra_analytics`.
    - Create a Table named `user_interactions` with a flexible schema or allow auto-detect.

## 🚀 4. Final Deployment
Use the provided automation script to build the frontend and deploy the backend.

1.  **Make script executable**:
    ```bash
    chmod +x deploy.sh
    ```
2.  **Run Deployment**:
    ```bash
    ./deploy.sh
    ```
    *This will build the multi-stage Docker image, push it to GCR, and deploy to Cloud Run.*

## 🔗 5. Update Frontend API Link (Post-Deploy)
Once the deployment finishes, `gcloud` will provide a Service URL (e.g., `https://matmitra-xxxxxx.a.run.app`).

1.  Update your `client/.env` file:
    ```env
    VITE_API_URL=https://matmitra-xxxxxx.a.run.app/api
    ```
2.  **Optional**: If you want the frontend to automatically point to production, rebuild and redeploy once with this URL, or use a relative path if serving from the same domain (which the Dockerfile already handles by serving `/public`).

## ✅ 6. Verification
- Open the Cloud Run URL.
- Test the **AI Sahayak** (Wait a few seconds for the first cold start).
- Check **Cloud Logging** -> Search for `matmitra-app-log` to see incoming requests.
- Verify **BigQuery** -> Query the `user_interactions` table to see tracked events.

---
*MatMitra · Built for PromptWars 2025 · 🇮🇳*
