import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";

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
      <figure id="logo-container">
        <img id="logo" src="/pawlogo.png" alt="" />
      </figure>
      <h1 id="header-home">Hello, welcome to Furrventions!</h1>
    </header>
    <App />
  </>
);
