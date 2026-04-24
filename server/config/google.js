const { VertexAI } = require('@google-cloud/vertexai');
const { BigQuery } = require('@google-cloud/bigquery');
const { Logging } = require('@google-cloud/logging');
const monitoring = require('@google-cloud/monitoring');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Unified Project ID detection (Checks 4 common env vars)
const rawProjectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 
                   process.env.FIREBASE_PROJECT_ID || 
                   process.env.GCP_PROJECT ||
                   process.env.PROJECT_ID;

// Filter out placeholder strings
const projectId = (rawProjectId && !rawProjectId.includes('your-project') && !rawProjectId.includes('demo')) 
  ? rawProjectId 
  : undefined;

const region = process.env.GOOGLE_CLOUD_REGION || 'europe-west1';

// 1. Secret Manager Client
const secretManager = new SecretManagerServiceClient({ projectId });

async function getSecret(secretName) {
  try {
    const parentPath = projectId ? `projects/${projectId}` : `projects/undefined`;
    const [version] = await secretManager.accessSecretVersion({
      name: `${parentPath}/secrets/${secretName}/versions/latest`,
    });
    return version.payload.data.toString();
  } catch (err) {
    if (!err.message.includes('Could not load the default credentials')) {
        console.warn(`💡 Secret ${secretName} fallback to .env:`, err.message);
    }
    return process.env[secretName.toUpperCase()] || null;
  }
}

// 2. Vertex AI Client - MUST have a project ID to work
// If it's missing, we log a warning instead of letting it crash the entire process at the top level
let vertexAI;
if (projectId) {
  vertexAI = new VertexAI({ project: projectId, location: region });
} else {
  console.warn("⚠️ Vertex AI: No PROJECT_ID detected. Personalised briefings will be disabled.");
}

// 3. BigQuery Client
const bigquery = new BigQuery({ projectId });

// 4. Cloud Logging Client
const logging = new Logging({ projectId });
const log = logging.log('matmitra-app-log');

// 5. Cloud Monitoring Client
let monitoringClient;
try {
  monitoringClient = new monitoring.MetricServiceClient({ projectId });
} catch (e) {
  console.warn("⚠️ Monitoring client failed to load:", e.message);
}

// 6. Gemini AI SDK Client (Direct)
const getGeminiClient = async () => {
  const apiKey = await getSecret('GEMINI_API_KEY');
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
  return new GoogleGenerativeAI(apiKey);
};

module.exports = {
  projectId,
  region,
  vertexAI,
  bigquery,
  log,
  monitoringClient,
  getGeminiClient,
  getSecret
};
