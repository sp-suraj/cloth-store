import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHqLSIAfhqoD3PIzjdtHzIlKl7rW1UbTA",
  authDomain: "my-shop-cloth.firebaseapp.com",
  projectId: "my-shop-cloth",
  storageBucket: "my-shop-cloth.appspot.com",
  messagingSenderId: "779149382214",
  appId: "1:779149382214:web:7bb5c0cd0940c3691cf047",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const db = getFirestore();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnaphot = await getDoc(userDocRef);

  if (!userSnaphot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error during creating the user", error.message);
    }
  }
};
