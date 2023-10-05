import React from "react";

import { signInWithPopup } from "firebase/auth";
import "../../css/authscreen.css";
import { provider, spyAuth } from "../../utils/db.js";

import google from "../../img/google.png";

const AuthScreen = ({ setlogStatus }) => {
  // const onetimepass = {
  //   photoURL:
  //     "https://lh3.googleusercontent.com/a/AAcHTteQoDVX2wDIDs_HIWpvfG1kvj0G9W811iDD3nMzWQA58A=s96-c",
  //   uid: "pBytPIZ9gben8MX5FuVm0MntKBJ3",
  //   email: "okpakomaraez@gmail.com"
  // };
  function signIn() {
    signInWithPopup(spyAuth, provider).then((data) => {
      localStorage.setItem("logged", JSON.stringify(data.user));
      setlogStatus(data.user);
    });

    // localStorage.setItem("logged", JSON.stringify(onetimepass));
  }
  return (
    <div className="auth-container">
      {" "}
      <div className="box">
        <div className="emoji">🙄</div>

        <div onClick={signIn}>
          <img src={google} alt="ico" />
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
