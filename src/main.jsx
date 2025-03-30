import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { shadesOfPurple } from "@clerk/themes";

import ViewCons from "./Components/ViewCons.jsx";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import ManageConventions from "./Components/ManageConventions.jsx";
import AddConvention from "./Components/AddConvention.jsx";
import {
  RedirectToSignIn,
  ClerkLoading,
  ClerkLoaded,
  ClerkProvider
} from "@clerk/clerk-react";
import Kofi from "./Components/Kofi.jsx";
import "./Components/ViewCons.css";

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
  <StrictMode>
    <ClerkProvider
      touchSession={false}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{ baseTheme: shadesOfPurple }}
    >
      <ClerkLoading>
        <div>Clerk is loading</div>
      </ClerkLoading>
      <ClerkLoaded>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route exact path="/" element={<App />} />
              <Route exact path="signin" element={<RedirectToSignIn />} />
              <Route
                exact
                path="manage/:id/conventions"
                element={<ManageConventions />}
              />
              <Route exact path="conventions" element={<ViewCons />} />
              <Route exact path="conventions/add" element={<AddConvention />} />
              <Route exact path="conventions/:id" element={<AddConvention />} />
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
      </ClerkLoaded>
    </ClerkProvider>
  </StrictMode>
);
