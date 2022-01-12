import {io} from "socket.io-client";
import {baseSocketIoBackendUrl} from "../env/environment";
import {getAccessToken} from "./AuthenticationService";
import {Alert} from "@mui/material";

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
        console.log(allExpiredBookIds)

        const expired = allExpiredBookIds.hasOwnProperty('expired') ? allExpiredBookIds.expired : [];
        const notExpired = allExpiredBookIds.hasOwnProperty('notExpired') ? allExpiredBookIds.notExpired : [];

        // todo alina das mit einer react component schön und gut darstellen!!!!
        let message = 'All Books expired Date: ';
        for (const book of expired) {
            message += book.titel + ', \n'
        }
        message += '\n\n\nAll Books NOT expired Date'
        for (const book of notExpired) {
            message += book.titel + ', \n'
        }
        alert(message)

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