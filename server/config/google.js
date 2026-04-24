const { VertexAI } = require('@google-cloud/vertexai');
const { BigQuery } = require('@google-cloud/bigquery');
const { Logging } = require('@google-cloud/logging');
const monitoring = require('@google-cloud/monitoring');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// 1. Config
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'promptwars-492606';
const region = process.env.GOOGLE_CLOUD_REGION || 'europe-west1';

// ⚡ EFFICIENCY: In-memory cache for secrets to reduce API latency/cost
const secretCache = new Map();

/**
 * MatMitra GCP Service Provider
 * Handles authentication and initialization for all 9 Google services.
 */
const secretManager = new SecretManagerServiceClient({ projectId });

/**
 * Accesses Google Secret Manager with local caching.
 * @param {string} secretName - Name of the secret to fetch.
 * @returns {Promise<string|null>} - The secret value or null if not found.
 */
async function getSecret(secretName) {
  if (secretCache.has(secretName)) return secretCache.get(secretName);

  try {
    const parent = projectId ? `projects/${projectId}` : 'projects/current';
    const [version] = await secretManager.accessSecretVersion({
      name: `${parent}/secrets/${secretName}/versions/latest`,
    });
    const val = version.payload.data.toString();
    secretCache.set(secretName, val); // ⚡ Cache it
    return val;
  } catch (err) {
    return process.env[secretName.toUpperCase()] || null;
  }
}

/** 🤖 Vertex AI Initialization */
const vertexAI = (projectId) ? new VertexAI({ project: projectId, location: region }) : null;

/** 📊 BigQuery Streaming Client */
const bigquery = new BigQuery({ projectId });

/** 📜 Cloud Logging Structured Log */
const logging = new Logging({ projectId });
const log = logging.log('matmitra-app-log');

/** 📉 Cloud Monitoring Metrics Client */
let monitoringClient;
try {
  monitoringClient = new monitoring.MetricServiceClient({ projectId });
} catch (e) { }

/**
 * Initializes Gemini AI Client with delegated key management.
 */
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
