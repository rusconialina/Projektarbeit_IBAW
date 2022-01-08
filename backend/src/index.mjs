import express from "express";
import bookRoutes from "./routes/book.routes.mjs";
import cors from "cors";
import authenticationRoutes from "./routes/authentication.routes.mjs";
import {checkAccessToken} from "./services/authentication.service.mjs";

//connect();

const app = express();
const port = process.env.PORT || 3000;
const loginRoute = '/authentication/login'

// develop helper see wich port is the node.js express's application running
app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);



// ===========  Register Middleware ===========
app.use(express.json());

// Cors Middleware
app.use(cors());


// Token Authentication Middleware (Protect all Routes except the login route)
app.use(function (req, res, next) {
  console.log('Hit Token Authentication Middleware');
  /*const sendAccessToken = req.headers.authorization; //the access token is in the HTTP Auth header

  // login route not protected because no token needed is username/password!
  if (req.url !== loginRoute){

    // all other routes check access token before continue
    if (!sendAccessToken) { // check is there access token in http authorization header
      return res.status(403).json({ error: 'Missing HTTP authorization header' });
    }

    // validate the access token
    if (!checkAccessToken(sendAccessToken)){
      return res.status(403).json({ error: `Permission denied. The access token:${sendAccessToken} is not valid` });
    }

  }*/

  // only if all checks above are valid, continue with the request (send to the controller z.B. /books)
  next();

});

// =========== END Register Middleware ===========


// =========== Register all controllers ===========
app.use("/authentication", authenticationRoutes);
app.use("/book", bookRoutes);


// =========== END Register all controllers ===========
