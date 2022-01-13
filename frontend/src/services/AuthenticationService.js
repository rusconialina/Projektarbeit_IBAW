import axios from "axios";
import {baseBackendUrl} from "../env/environment";
import React from "react";
import {useNavigate} from "react-router-dom";
import {startListeningOnSocket} from "./SocketService";


const sessionTokenKey = 'accessToken';

export function loginUser(loginRequest) {
    return axios.post(baseBackendUrl + 'authentication/login', loginRequest)
        .then(function (response) {
            if(response.status === 200 && response.data.accessToken){
                setAccessToken(response.data.accessToken);
                startListeningOnSocket();
            }
            return response
        });
}

export function logoutUser(){
    clearAccessToken();
}

export function setAccessToken(accessToken){
    if (accessToken === null || accessToken === undefined){
        clearAccessToken();
    }else {
        sessionStorage.setItem(sessionTokenKey, accessToken);
    }
}

export function getAccessToken(){
    const saveAccessToken = sessionStorage.getItem(sessionTokenKey);
    return saveAccessToken === 'null' || saveAccessToken === undefined || saveAccessToken === null || saveAccessToken === '' ? saveAccessToken : saveAccessToken;
}

export function clearAccessToken(){
    sessionStorage.removeItem(sessionTokenKey);
}
