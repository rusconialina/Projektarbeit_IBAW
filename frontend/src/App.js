//import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { useState, useEffect } from "react";

import "./App.css";

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
  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/books">Bücherverwaltung</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
