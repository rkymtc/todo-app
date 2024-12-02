require('dotenv').config();
const admin = require('firebase-admin');

// Firebase Admin SDK yapılandırması
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DB_URL,
});

const db = admin.database();
module.exports = db;
