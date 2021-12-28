//import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import Login from "./pages/Login";
import Books from "./pages/Books";
import Book from "./pages/BooksDetail";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Preferences from "./components/Preferences";
import ButtonAppBar from "./components/NavBar";
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
  /*
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
  */
  return (
    <Router>
      <Link to="/books">Bücherverwaltung</Link>
      <Link to="/book">Detail</Link>
      <Link to="/login">Login</Link>

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
