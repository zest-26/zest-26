import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// You need to download service account key from Firebase Console
// and place it as serviceAccountKey.json in the config folder
let serviceAccount;
try {
  serviceAccount = JSON.parse(
    readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
  );
} catch (error) {
  console.error('Service account key not found. Using environment variables.');
  serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
  };
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth, admin };