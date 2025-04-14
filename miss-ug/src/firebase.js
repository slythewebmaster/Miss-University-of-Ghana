import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtwq0i-ZJ-bFnYbYUm1kPV4NA10IJPCwU",
  authDomain: "miss-ug.firebaseapp.com",
  projectId: "miss-ug",
  storageBucket: "miss-ug.firebasestorage.app",
  messagingSenderId: "899429342694",
  appId: "1:899429342694:web:4ffb98b04629d7b1cb0a27",
  measurementId: "G-VPPMJKKC1H"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();