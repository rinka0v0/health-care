import { auth } from "../../../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<void> => {
  await signInWithRedirect(auth, provider);
};
