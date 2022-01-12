import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Books from "./pages/Books";
import Book from "./pages/BooksDetail";
import "./styles/App.css";


import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {getAccessToken, logoutUser} from "./services/AuthenticationService";
import {io} from "socket.io-client";
import {baseSocketIoBackendUrl} from "./env/environment";
import {useEffect} from "react";

function App() {
    const navigate = useNavigate();


    function logoutAndRedirect() {
        logoutUser();
        navigate('/login');
    }

    // if no access token user is not login
    if (!getAccessToken()) {
        return <Login/>;
    }



  return (
    <div>

        <div className="header">
            <a className='titel'>Alina's Bibliothek</a>
            <a onClick={logoutAndRedirect}>Logout</a>
        </div>

      <Routes>
        <Route exact path="/" element={<Books />} />
        <Route exact path="/books" element={<Books />} />
        <Route exact path="/books/:bookId" element={<Book />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
