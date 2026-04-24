const { VertexAI } = require('@google-cloud/vertexai');
const { BigQuery } = require('@google-cloud/bigquery');
const { Logging } = require('@google-cloud/logging');
const { Monitoring } = require('@google-cloud/monitoring');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const region = process.env.GOOGLE_CLOUD_REGION || 'asia-south-1';

// 1. Secret Manager Client
const secretManager = new SecretManagerServiceClient();

async function getSecret(secretName) {
  try {
    const [version] = await secretManager.accessSecretVersion({
      name: `projects/${projectId}/secrets/${secretName}/versions/latest`,
    });
    return version.payload.data.toString();
  } catch (err) {
    console.error(`Error accessing secret ${secretName}:`, err);
    return process.env[secretName.toUpperCase()] || null;
  }
}

// 2. Vertex AI Client
const vertexAI = new VertexAI({ project: projectId, location: region });

// 3. BigQuery Client
const bigquery = new BigQuery({ projectId });

// 4. Cloud Logging Client
const logging = new Logging({ projectId });
const log = logging.log('matmitra-app-log');

// 5. Cloud Monitoring Client
const monitoringClient = new Monitoring.MetricServiceClient();

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
