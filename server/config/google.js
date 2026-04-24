const { VertexAI } = require('@google-cloud/vertexai');
const { BigQuery } = require('@google-cloud/bigquery');
const { Logging } = require('@google-cloud/logging');
const monitoring = require('@google-cloud/monitoring');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
const region = process.env.GOOGLE_CLOUD_REGION || 'europe-west1';

const secretManager = new SecretManagerServiceClient({ projectId });

async function getSecret(secretName) {
  try {
    const parent = projectId ? `projects/${projectId}` : 'projects/current';
    const [version] = await secretManager.accessSecretVersion({
      name: `${parent}/secrets/${secretName}/versions/latest`,
    });
    return version.payload.data.toString();
  } catch (err) {
    return process.env[secretName.toUpperCase()] || null;
  }
}

const vertexAI = (projectId && !projectId.includes('your-project')) ? new VertexAI({ project: projectId, location: region }) : null;
const bigquery = new BigQuery({ projectId });
const logging = new Logging({ projectId });
const log = logging.log('matmitra-app-log');

let monitoringClient;
try {
  monitoringClient = new monitoring.MetricServiceClient({ projectId });
} catch (e) {}

const getGeminiClient = async () => {
  const apiKey = await getSecret('GEMINI_API_KEY');
  return new GoogleGenerativeAI(apiKey || 'fallback_key_not_set');
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
