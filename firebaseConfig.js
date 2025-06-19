// firebase.js or firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2DN6eyWCpEl6kjEYVCXhh-y_IrPqQUgI",
  authDomain: "chateo-c4ff3.firebaseapp.com",
  databaseURL: "https://chateo-c4ff3-default-rtdb.firebaseio.com",
  projectId: "chateo-c4ff3",
  storageBucket: "chateo-c4ff3.appspot.com",
  messagingSenderId: "810779450882",
  appId: "1:810779450882:web:d1cffc178c7561cc67511b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
