import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import ConventionList from "./Components/ConventionList.jsx";
import Header from "./Components/Header.jsx";
import ManageConventions from "./Components/ManageConventions.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route
          exact
          path="manage/:id/conventions"
          element={<ManageConventions />}
        />
        <Route exact path="conventions" element={<ConventionList />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<Signup />} />
      </Routes>
    </Router>
  </StrictMode>
);
