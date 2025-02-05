import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR3_YUkyYgLAcl5kFaAPG6Zm4GwAizRRQ",
  authDomain: "ai-trip-planner-68430.firebaseapp.com",
  projectId: "ai-trip-planner-68430",
  storageBucket: "ai-trip-planner-68430.firebasestorage.app",
  messagingSenderId: "28777801962",
  appId: "1:28777801962:web:5383598672751a0e050f93",
  measurementId: "G-67WLDPPF3M"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
