import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import {getAccessToken} from "./services/AuthenticationService";
import {BrowserRouter} from "react-router-dom";

// ======= Register all middleware/interceptor for axios requests
axios.defaults.headers.common['Authorization'] = getAccessToken();


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

