import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chamados-app-2eb4c.firebaseapp.com",
  projectId: "chamados-app-2eb4c",
  storageBucket: "chamados-app-2eb4c.appspot.com",
  messagingSenderId: "927739817409",
  appId: "1:927739817409:web:b03e91a19f1eb4f69b1340"
};


const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);