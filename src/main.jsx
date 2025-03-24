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
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const user = {
  id: 0,
  username: "V",
  isOrganizer: true,
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Router>
        <Header _user={user} />
        <Routes>
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<Signup />} />
          <Route exact path="/" element={<App />} />
          <Route
            exact
            path="manage/:id/conventions"
            element={<ManageConventions />}
          />
          <Route exact path="conventions" element={<ConventionList />} />
        </Routes>
      </Router>
    </ClerkProvider>
  </StrictMode>
);
