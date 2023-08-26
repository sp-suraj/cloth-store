import React from "react";
import "./auth.styles.scss";
import SignIn from "../sign-in/sign-in";
import SignUpForm from "../sign-up-form/sign-up-form";

export default function AuthForm() {
  return (
    <div className="authentication-container">
      <SignIn />
      <SignUpForm />
    </div>
  );
}
