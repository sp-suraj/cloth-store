import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase";
import React from "react";

export default function SignIn() {
  async function googleLoginViaPopup() {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={googleLoginViaPopup}>SignIn whth google</button>
    </div>
  );
}
