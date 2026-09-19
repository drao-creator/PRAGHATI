import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCyng6BXYry52ohc_qFBPzP2X9S0EW9LdQ",
  authDomain: "career-readiness-navigator.firebaseapp.com",
  projectId: "career-readiness-navigator",
  storageBucket: "career-readiness-navigator.firebasestorage.app",
  messagingSenderId: "622084175536",
  appId: "1:622084175536:web:b5cf7dc256c366816eed75"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };