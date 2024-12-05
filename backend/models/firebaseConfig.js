const admin = require("firebase-admin");


const serviceAccount = require("../firabase-config.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://noteapp-4b363-default-rtdb.firebaseio.com"
});

const db = admin.database();

module.exports = db;


