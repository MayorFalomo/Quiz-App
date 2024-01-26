// export default Firebase-config
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "quiz-app-286d4.firebaseapp.com",
  projectId: "quiz-app-286d4",
  storageBucket: "quiz-app-286d4.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
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
