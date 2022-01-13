import React, { useState } from "react";
import {LoginRequest} from "../models/LoginRequest";
import {getAccessToken, loginUser} from "../services/AuthenticationService";
import { useNavigate } from "react-router-dom";
import '../styles/App.css'
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";


export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  });
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser(
        new LoginRequest(username, password)
    ).then(function (response){
      navigate('/books');
      return true;
    }).catch(function (error) {
      setOpen(true);
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
      <div className="main-login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <p>
              <FormControl sx={{ width: '20rem' }} >
                <TextField id="outlined-basic" label="Benutzer" variant="outlined" onChange={(e) => setUserName(e.target.value)}/>
              </FormControl>
            </p>
            <p>
              <FormControl sx={{  width: '20rem' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Passwort</InputLabel>
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
            <FormControl>
              <Button onClick={handleSubmit} variant="contained" >
                Anmelden
              </Button>
            </FormControl>
          </div>

          <FormControl>
            <div className={'alert'} id="alert" >
              <Collapse in={open}>
                <Alert
                    severity="error"
                    action={
                      <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                >
                  Benutzername und/oder Passwort falsch.
                </Alert>
              </Collapse>
            </div>
          </FormControl>
        </form>
      </div>

    </div>
  );
}
