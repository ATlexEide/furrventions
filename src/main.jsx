import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ViewCons from "./Components/ViewCons.jsx";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import ManageConventions from "./Components/ManageConventions.jsx";
import AddConvention from "./Components/AddConvention.jsx";

import Kofi from "./Components/Kofi.jsx";
import "./styles/ViewCons.css";
import ViewConInfo from "./Components/ViewConInfo.jsx";
import SignUp from "./Components/Signup.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error("Missing Supabase Url");
}
if (!import.meta.env.VITE_SUPABASE_KEY) {
  throw new Error("Missing Supabase Key");
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <Router>
    <Header />
    <main>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="signin" element={} />
        <Route exact path="signup" element={<SignUp />} />

        <Route
          exact
          path="manage/:id/conventions"
          element={<ManageConventions />}
        />
        <Route exact path="conventions" element={<ViewCons />} />
        <Route exact path="conventions/add" element={<AddConvention />} />
        <Route exact path="conventions/:id" element={<ViewConInfo />} />
        <Route
          exact
          path="user/:id/manage/conventions"
          element={<AddConvention />}
        />
        <Route exact path="support" element={<Kofi />} />
      </Routes>
    </main>
    <Footer />
  </Router>

  // </StrictMode>
);
