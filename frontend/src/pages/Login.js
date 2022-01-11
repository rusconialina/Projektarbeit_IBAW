import React, { useState } from "react";
import {LoginRequest} from "../models/LoginRequest";
import  {loginUser} from "../services/AuthenticationService";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  });
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


  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>
            <FormControl sx={{ m: 0.5, width: '25ch' }} >
              <TextField id="outlined-basic" label="Benutzer" variant="outlined" onChange={(e) => setUserName(e.target.value)}/>
            </FormControl>
          </p>
          <p>
            <FormControl sx={{ m: 0.5, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                  id="outlined-adornment-password"
                  type={password.showPassword ? 'text' : 'password'}
                  value={password.password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                      >
                        {password.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Kennwort"
              />
            </FormControl>
          </p>
        </div>
        <div>
          <FormControl sx={{ m: 0.5}} >
            <Button onClick={handleSubmit} variant="contained" >
              Anmelden
            </Button>
          </FormControl>
        </div>
      </form>
    </div>
  );
}
