const { VertexAI } = require('@google-cloud/vertexai');
const { BigQuery } = require('@google-cloud/bigquery');
const { Logging } = require('@google-cloud/logging');
const monitoring = require('@google-cloud/monitoring');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Defensive check for Project ID
const rawProjectId = process.env.GOOGLE_CLOUD_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
// Ignore placeholder strings
const projectId = (rawProjectId && !rawProjectId.includes('your-project') && !rawProjectId.includes('demo')) 
  ? rawProjectId 
  : undefined;

const region = process.env.GOOGLE_CLOUD_REGION || 'europe-west1';

// 1. Secret Manager Client
const secretManager = new SecretManagerServiceClient({ projectId });

async function getSecret(secretName) {
  try {
    const parentPath = projectId ? `projects/${projectId}` : `projects/${process.env.PROJECT_NUMBER || 'current'}`;
    const [version] = await secretManager.accessSecretVersion({
      name: `${parentPath}/secrets/${secretName}/versions/latest`,
    });
    return version.payload.data.toString();
  } catch (err) {
    console.warn(`💡 Secret ${secretName} fallback to .env:`, err.message);
    return process.env[secretName.toUpperCase()] || null;
  }
}

// Clients (Auto-detecting when projectId is undefined)
const vertexAI = new VertexAI({ project: projectId, location: region });
const bigquery = new BigQuery({ projectId });
const logging = new Logging({ projectId });
const log = logging.log('matmitra-app-log');

let monitoringClient;
try {
  monitoringClient = new monitoring.MetricServiceClient({ projectId });
} catch (e) {
  console.warn("⚠️ Monitoring client failed to load:", e.message);
}

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
