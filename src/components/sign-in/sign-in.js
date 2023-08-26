import React from "react";
import "./sign-in.styles.scss";
import Button from "../button/button";
import { useState } from "react";
import FormInput from "../form-input/form-input";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  async function googleLoginViaPopup() {
    await signInWithGooglePopup();
  }

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await signInUserWithEmailAndPassword(email, password);
    } catch (err) {
      switch (err?.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(err);
      }
    }
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label={"Email"}
          name={"email"}
          required
          type={"email"}
          value={email}
          onChange={onChangeHandler}
        />
        <FormInput
          label={"Password"}
          name={"password"}
          required
          type={"password"}
          value={password}
          onChange={onChangeHandler}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={"google"}
            onClick={googleLoginViaPopup}
            type="button"
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
