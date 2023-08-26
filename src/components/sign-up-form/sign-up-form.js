import React from "react";
import "./sign-up-form.styles.scss";
import Button from "../button/button";
import { useState } from "react";
import FormInput from "../form-input/form-input";
import {
  createNewUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../utils/firebase";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log("Sign up hits");

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    try {
      const { user } = await createNewUserWithEmailAndPassword(email, password);
      await createUserDocFromAuth(user, { displayName });
      setFormFields(defaultFormFields);
    } catch (err) {
      if (err.code === "auth/email-already-in-use")
        alert("Can not create user, email already in use");
      else console.log(err);
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label={"Display Name"}
          name={"displayName"}
          required
          type={"text"}
          value={displayName}
          onChange={onChangeHandler}
        />
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
        <FormInput
          label={"Confirm Password"}
          name={"confirmPassword"}
          required
          type={"password"}
          value={confirmPassword}
          onChange={onChangeHandler}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
