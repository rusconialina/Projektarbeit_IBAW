import express from "express";
import bookRoutes from "./routes/book.routes.mjs";
import cors from "cors";
import authenticationRoutes from "./routes/authentication.routes.mjs";
import {checkAccessToken} from "./services/authentication.service.mjs";
import connect from "./utils/db.mjs";

import { createServer } from 'http'
import { Server } from 'socket.io'
import {checkAllBooksIsDateExpired} from "./services/book.service.mjs";


connect();

const app = express();
const portExpressServer = process.env.PORT || 3000;
const portSocketIoServer = process.env.PORT || 8082;
const loginRoute = '/authentication/login'


// express server listening
app.listen(portExpressServer, () =>
  console.log(`App listening on http://localhost:${portExpressServer}`)
);



// ===========  Register Middleware ===========
app.use(express.json());

// Cors Middleware
app.use(cors());

// Token Authentication Middleware (Protect all Routes except the login route)
app.use(function (req, res, next) {
  console.log('Hit Token Authentication Middleware');
  const sendAccessToken = req.headers.authorization; //the access token is in the HTTP Auth header

  // login route not protected because no token needed is username/password!
  if (req.url !== loginRoute){

    // all other routes check access token before continue
    if (!sendAccessToken && sendAccessToken !== '') { // check is there access token in http authorization header
      return res.status(403).json({ error: 'Missing HTTP authorization header' });
    }

    // validate the access token
    if (!checkAccessToken(sendAccessToken)){
      return res.status(403).json({ error: `Permission denied. The access token:${sendAccessToken} is not valid` });
    }

  }

  // only if all checks above are valid, continue with the request (send to the controller z.B. /books)
  next();

});
// =========== END Register Middleware ===========


// =========== Register all controllers ===========
app.use("/authentication", authenticationRoutes);
app.use("/book", bookRoutes);
// =========== END Register all controllers ===========


// =========== Socket IO ===========
const httpServer = createServer(app);
const intervallInSecondsCheckIsDateExpired = 6000;
const io = new Server(httpServer, { cors: {
        origin: ["http://localhost:8082", "http://localhost:8000"], // register all frontend application urls
        methods: ["GET", "POST"]
    } });

io.on("connection", (socket) => {
    console.log('socket is connected')
    console.log('socket id is: '  + socket.id)

    // run all X seconds after connecting to socket
    setInterval(checkAllBooksIsDateExpired, intervallInSecondsCheckIsDateExpired * 1000, socket);
});

httpServer.listen(portSocketIoServer, () =>
    console.log(`Socket IO listening on http://localhost:${portSocketIoServer}`)
);
// =========== END Socket IO ===========