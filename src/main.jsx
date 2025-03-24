import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { shadesOfPurple } from "@clerk/themes";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import "./index.css";
import App from "./App.jsx";
import ConventionList from "./Components/ConventionList.jsx";
import Header from "./Components/Header.jsx";
import ManageConventions from "./Components/ManageConventions.jsx";
import { ClerkLoading, ClerkLoaded, ClerkProvider } from "@clerk/clerk-react";

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
          <SignedIn>
            <Routes>
              <Route exact path="/" element={<App />} />
              <Route
                exact
                path="manage/:id/conventions"
                element={<ManageConventions />}
              />
              <Route exact path="conventions" element={<ConventionList />} />
            </Routes>
          </SignedIn>

          <SignedOut>
            <Routes>
              <Route exact path="/" element={<ConventionList />} />
            </Routes>
          </SignedOut>
        </Router>
      </ClerkLoaded>
    </ClerkProvider>
  </StrictMode>
);
