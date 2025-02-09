import admin from 'firebase-admin'
import dotenv from "dotenv";

dotenv.config();
// 1. Initialize firebase admin sdk
// Added all firebase-admin.json key file data in .env and access here as a object so we can easily upload our project on github because secret key json file is not allowed on github
// All firebase stored in this firebase folder and used in admin controller to delete image via image storage path

// Construct the service account object from environment variables
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};


// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "dav-college-ea906.appspot.com",
});

export const bucket = admin.storage().bucket();