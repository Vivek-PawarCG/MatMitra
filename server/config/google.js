const { VertexAI } = require('@google-cloud/vertexai');
const { BigQuery } = require('@google-cloud/bigquery');
const { Logging } = require('@google-cloud/logging');
const monitoring = require('@google-cloud/monitoring');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Consolidated Project ID detection
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 
                  process.env.FIREBASE_PROJECT_ID || 
                  process.env.GCP_PROJECT || 
                  process.env.PROJECT_ID;

const region = process.env.GOOGLE_CLOUD_REGION || 'europe-west1';

// 1. Secret Manager Client
const secretManager = new SecretManagerServiceClient({ projectId });

/**
 * Robust secret fetcher with environment fallback
 */
async function getSecret(secretName) {
  try {
    // In Cloud Run, 'current' is the easiest way to refer to the active project
    const parent = projectId ? `projects/${projectId}` : 'projects/current';
    const [version] = await secretManager.accessSecretVersion({
      name: `${parent}/secrets/${secretName}/versions/latest`,
    });
    return version.payload.data.toString();
  } catch (err) {
    // Only log if it's not a standard "local mode" error
    if (!err.message.includes('Could not load the default credentials')) {
      console.warn(`💡 Secret ${secretName} from .env fallback:`, err.message);
    }
    return process.env[secretName.toUpperCase()] || null;
  }
}

// 2. Vertex AI Client
let vertexAI;
try {
  // Vertex AI is strict about project IDs, so we check existence first
  if (projectId && !projectId.includes('your-project')) {
    vertexAI = new VertexAI({ project: projectId, location: region });
  }
} catch (e) {
  console.warn("⚠️ Vertex AI initialization failed:", e.message);
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
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set in Secret Manager or .env');
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
