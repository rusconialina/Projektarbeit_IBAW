import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Books from "./pages/Books";
import Book from "./pages/BooksDetail";
import "./App.css";


import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {getAccessToken, logoutUser} from "./services/AuthenticationService";

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
            <div className="header-right">
                <a onClick={logoutAndRedirect}>Logout</a>
            </div>
        </div>

      <Routes>
        <Route exact path="/" element={<Books />} />
        <Route exact path="/books" element={<Books />} />
        <Route exact path="/books/:id" element={<Book />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
