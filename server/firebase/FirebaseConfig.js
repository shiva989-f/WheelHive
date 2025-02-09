import admin from 'firebase-admin'
import serviceAccount from "./dav-college-ea906-firebase-adminsdk-vswwi-995f276598.json" assert { type: "json" };

// 1. Initialize firebase admin sdk
// All firebase stored in this firebase folder and used in admin controller to delete image via image storage path

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "dav-college-ea906.appspot.com",
});

export const bucket = admin.storage().bucket();