// export default Firebase-config
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc8w4Z0VbMVpL_-E-NVwUVYydCqGD5nWI",
  authDomain: "quiz-app-286d4.firebaseapp.com",
  projectId: "quiz-app-286d4",
  storageBucket: "quiz-app-286d4.appspot.com",
  messagingSenderId: "298224485534",
  appId: "1:298224485534:web:78361b50e5032365ac678f",
  measurementId: "G-PPW2CWYKZ5",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export const db = getFirestore(app);
// const db = getFirestore(app);
// export { db };
