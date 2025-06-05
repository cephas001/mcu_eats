const admin = require("firebase-admin");
const credentials = require("./config/firebase_key/mcu-eats-firebase-adminsdk-fbsvc-8300ea3ec4.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

module.exports = admin;
