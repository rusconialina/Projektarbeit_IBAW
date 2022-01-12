import {io} from "socket.io-client";
import {baseSocketIoBackendUrl} from "../env/environment";
import {getAccessToken} from "./AuthenticationService";
import {Alert} from "@mui/material";
import * as React from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export function startListeningOnSocket() {
    let socket = io(baseSocketIoBackendUrl, {
        transports: ['websocket', 'polling'] ,
        extraHeaders: {
            Authorization: getAccessToken()
        }
    });

    // connect to socket
    socket.on("connect", () => {
        console.log('Socked Id is: ' + socket.id);
    });

    // start listening on event checkExpireDateBooks
    socket.on('checkExpireDateBooks', function(allExpiredBookIds) {
        console.log('checkExpireDateBooks response form socket io');
        //console.log(allExpiredBookIds)

        const expired = allExpiredBookIds.hasOwnProperty('expired') ? allExpiredBookIds.expired : [];

        // todo alina das mit einer react component schön und gut darstellen!!!!
        let message = 'All Books expired Date: ';
        for (const book of expired) {
            message += book.titel + ', \n'
        }

        if (expired.length){
            alert(message)
        }
    });

    // error handling
    socket.on("connect_error", (err) => {
        console.log(err.message);
    });
}

export function stopListeningOnSocket(socket) {
    if (socket){
        socket.disconnect()
    }
}