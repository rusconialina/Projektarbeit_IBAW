import React, { useState } from "react";
import {LoginRequest} from "../models/LoginRequest";
import  {loginUser} from "../services/AuthenticationService";
import { useNavigate } from "react-router-dom";




export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser(
        new LoginRequest(username, password)
    ).then(function (response){
      navigate('/books');
      return true;
    }).catch(function (error) {
      //todo alina make a html error message for the user "Passwort oder Username nicht korrekt" and show in html under the form
    });
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Benutzer</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Kennwort</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Anmelden</button>
        </div>
      </form>
    </div>
  );
}
