import router from "@/router";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECTID,
  appId: process.env.VUE_APP_APP_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_SENDER_ID,
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

const provider = new GoogleAuthProvider();
export const signInWithGoogle = (): void => {
  signInWithRedirect(auth, provider)
    .then(() => {
      router.push("/home");
    })
    .catch((e) => {
      console.log(e.message);
    });
};
