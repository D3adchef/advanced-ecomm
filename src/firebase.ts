import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrQwH1bxaYxfxLvOkqL9dRtsYWibxVvks",
  authDomain: "ecommerce-firebase-eac5a.firebaseapp.com",
  projectId: "ecommerce-firebase-eac5a",
  storageBucket: "ecommerce-firebase-eac5a.appspot.com", // ✅ fixed here
  messagingSenderId: "270011473446",
  appId: "1:270011473446:web:dc0b5c4004bc8e42c950e7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
