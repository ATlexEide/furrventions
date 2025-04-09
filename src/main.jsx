import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import ViewCons from "./Components/ViewCons.jsx";
import "./index.css";
import "./App.css";
import "./styles/Forms.css";
import App from "./App.jsx";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import ManageConventions from "./Components/ManageConventions.jsx";
import AddConvention from "./Components/AddConvention.jsx";

import Kofi from "./Components/Kofi.jsx";
import "./styles/ViewCons.css";
import ViewConInfo from "./Components/ViewConInfo.jsx";
import SignUp from "./Components/Signup.jsx";
import SignIn from "./Components/SignIn.jsx";

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error("Missing Supabase Url");
}
if (!import.meta.env.VITE_SUPABASE_KEY) {
  throw new Error("Missing Supabase Key");
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Header supabase={supabase} />
      <main>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="signin" element={<SignIn supabase={supabase} />} />
          <Route exact path="signup" element={<SignUp supabase={supabase} />} />

          <Route
            exact
            path="manage/:id/conventions"
            element={<ManageConventions supabase={supabase} />}
          />
          <Route
            exact
            path="conventions"
            element={<ViewCons supabase={supabase} />}
          />
          <Route
            exact
            path="conventions/add"
            element={<AddConvention supabase={supabase} />}
          />
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
  </StrictMode>
);
