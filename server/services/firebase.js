const admin = require('firebase-admin');
require('dotenv').config();

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // Handle private key escaping if needed
  privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
