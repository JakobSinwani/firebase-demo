import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDWHXObq4yKjbX5UElEqfkdZXu_7irSTpM",
  authDomain: "fb-tikal-demo.firebaseapp.com",
  projectId: "fb-tikal-demo",
  storageBucket: "fb-tikal-demo.appspot.com",
  messagingSenderId: "368865619832",
  appId: "1:368865619832:web:147ef322f71526970b228d",
  measurementId: "G-1G2T33BPEG",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
