import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Analytics } from "@vercel/analytics/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./App.jsx";
import ViewCons from "./Components/ConventionList/ViewCons.jsx";
import Header from "./Components/Main/Header.jsx";
import Footer from "./Components/Main/Footer.jsx";
import ManageConventions from "./Components/User/ManageConventions.jsx";
import AddConvention from "./Components/AddConventionForm/AddConvention.jsx";
import Kofi from "./Components/Utilities/Kofi.jsx";
import ViewConInfo from "./Components/Convention/ViewConInfo.jsx";
import SignUp from "./Components/User/SignUp.jsx";
import SignIn from "./Components/User/SignIn.jsx";

import "./index.css";
import "./App.css";
import "./styles/Forms.css";
import "./styles/ViewCons.css";
import "./Mobile.css";
import WipAlert from "./Components/Utilities/WipAlert.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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

// Material UI input and label colors////////////////////////////
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff"
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff"
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#bfbaba"
        }
      }
    }
  }
});
///////////////////////////////////////////////////////////////////

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <WipAlert />
      <Analytics />
      <Router>
        <Header supabase={supabase} />
        <main>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route
              exact
              path="signin"
              element={<SignIn supabase={supabase} />}
            />
            <Route
              exact
              path="signup"
              element={<SignUp supabase={supabase} />}
            />

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
            <Route
              exact
              path="conventions/:id"
              element={<ViewConInfo supabase={supabase} />}
            />
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
    </ThemeProvider>
  </StrictMode>
);
