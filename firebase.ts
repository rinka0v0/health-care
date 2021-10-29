import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  profectId: process.env.VUE_APP_PROJECTID,
  appId: process.env.VUE_APP_APP_ID,
};

initializeApp(firebaseConfig);

export const auth = getAuth();
// export const db = getFirestore();

const provider = new GoogleAuthProvider();
export const signInWithGoogle = (): void => {
  signInWithRedirect(auth, provider);
};
