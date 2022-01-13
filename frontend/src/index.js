import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import {activateAuthMiddleware, getAccessToken} from "./services/AuthenticationService";
import {BrowserRouter} from "react-router-dom";
import {startListeningOnSocket} from "./services/SocketService";

// ======= Register all middleware/interceptor for axios requests
activateAuthMiddleware();


if (getAccessToken()){
    startListeningOnSocket();
}

// ======= Render react js app ========
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

