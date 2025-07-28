// backend/src/config/firebase.ts

import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json'; // Must be in same folder

// Initialize Firebase Admin SDK using service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
