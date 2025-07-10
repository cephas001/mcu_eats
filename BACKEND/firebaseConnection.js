import admin from "firebase-admin";
import credentials from "./config/firebase_key/mcu-eats-firebase-adminsdk-fbsvc-8300ea3ec4.json" with { type: "json" };


export default admin.initializeApp({
  credential: admin.credential.cert(credentials),
});
