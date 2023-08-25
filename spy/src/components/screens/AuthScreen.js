import React from "react";

import { signInWithPopup } from "firebase/auth";
import "../../css/authscreen.css";
import { provider, spyAuth } from "../../utils/db.js";

import google from "../../img/google.png";

const AuthScreen = ({ setlogStatus }) => {
  function signIn() {
    signInWithPopup(spyAuth, provider).then((data) => {
      localStorage.setItem("logged", JSON.stringify(data.user));
      setlogStatus(data.user);
    });
  }
  return (
    <div classNamme="container">
      {" "}
      <div className="box">
        <div className='emoji'>🙄</div>

        <div onClick={signIn}>
          <img src={google} alt="ico" />
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
