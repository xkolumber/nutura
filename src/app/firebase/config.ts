import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvMUD9stckHZKxMiVUUni_mh3U9OTqndA",
  authDomain: "nutura-4e004.firebaseapp.com",
  projectId: "nutura-4e004",
  storageBucket: "nutura-4e004.appspot.com",
  messagingSenderId: "124843153403",
  appId: "1:124843153403:web:0059ea58917b18e47e5d5e",
};

const app = initializeApp(firebaseConfig);

export { app };
export const auth = getAuth(app);
