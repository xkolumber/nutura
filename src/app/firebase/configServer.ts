import {
  ServiceAccount,
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

const getServiceAccount = (): ServiceAccount => {
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    throw new Error("Missing Firebase service account environment variables");
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
};

let firestore: Firestore;
let auth: Auth;

if (!getApps().length) {
  const app = initializeApp({
    credential: cert(getServiceAccount()),
  });
  firestore = getFirestore(app);
  auth = getAuth(app);
} else {
  firestore = getFirestore();
  auth = getAuth();
}

export { firestore, auth };
