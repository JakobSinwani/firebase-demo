import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { setRecoil } from "recoil-nexus";
import { isLoggedInState } from "../../store/auth";
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log({ token, user });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  await signOut(auth);
};

onAuthStateChanged(auth, (user) => {
  setRecoil(isLoggedInState, !!user);
});
