import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Typography } from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { sendResetPasswordLink } from "../../utils/SupabaseUtils";

export default function SignIn({ supabase }) {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginDetails.email,
      password: loginDetails.password
    });
    if (error)
      switch (error.code) {
        case "invalid_credentials":
          alert("Invalid Credentials");
          break;

        default:
          throw new Error(error);
      }
    if (!error) {
      navigate("/");
      window.location.reload();
    }
  }
  return (
    <form id="signin-account">
      <section>
        <Typography component={"h2"} fontSize={"2rem"}>
          Log In
        </Typography>
      </section>
      <section id="inputs">
        <div className="input-container">
          <TextField
            fullWidth
            type="email"
            label={
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <EmailIcon /> Email *
              </span>
            }
            variant="outlined"
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, email: e.target.value });
            }}
          />
        </div>

        <div className="input-container-row">
          <TextField
            fullWidth
            type={isPasswordVisible ? "text" : "password"}
            label={
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <PasswordIcon /> Password *
              </span>
            }
            variant="outlined"
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, password: e.target.value });
            }}
          />
          <span
            className="password-visibility-toggle-container"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
      </section>
      <section id="submit-section">
        <button
          disabled={loginDetails.email && loginDetails.password ? false : true}
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
        >
          Log In
        </button>
        <Typography id="no-account-text">
          Forgot password?{" "}
          <Link
            onClick={() => {
              const email = prompt("Input email");
              sendResetPasswordLink(email);
            }}
          >
            Request new password
          </Link>
        </Typography>
        <Typography id="no-account-text">
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </section>
    </form>
  );
}
