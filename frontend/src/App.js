import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Books from "./pages/Books";
import Book from "./pages/BooksDetail";
import { useState, useEffect } from "react";
import "./App.css";
import useToken from "./components/useToken";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  /*const makeAPICall = async () => {
    try {
      const response = await fetch("http://localhost:8080/", { mode: "cors" });
      const data = await response.json();
      console.log({ data });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    makeAPICall();
  }, []);
*/

  //todo Logout
  //clearSession()
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <div class="header">
        <div class="header-right">
          <Link to="/books">Übersicht</Link>
          <Link to="/book">Neu</Link>
          <Link to="/login">Logout</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book" element={<Book />} />
        <Route path="*" element={<Books />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
