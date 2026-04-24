const admin = require('firebase-admin');
require('dotenv').config();

// Use Application Default Credentials (ADC) on Google Cloud
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      // Picks up project ID automatically or from environment
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || process.env.FIREBASE_PROJECT_ID
    });
    console.log("✅ Firebase Admin initialized with Application Default Credentials");
  } catch (error) {
    console.error("❌ Firebase Admin initialization failed:", error.message);
  }
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
