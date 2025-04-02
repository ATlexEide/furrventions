import { createRoot } from "react-dom/client";
import "./App.css";
import "./index.css";
import App from "./App.jsx";
import { Analytics } from "@vercel/analytics/react";

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
  <>
    <header>
      <p id="header-tag">Hello, welcome to Furrventions!</p>
    </header>
    <App />
    <Analytics />
  </>
);
