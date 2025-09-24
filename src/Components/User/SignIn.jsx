import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Typography } from "@mui/material";

export default function SignIn({ supabase }) {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginDetails.email,
      password: loginDetails.password
    });
    if (error) throw new Error(error);
    if (data) navigate("/");
    window.location.reload();
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
            required
            fullWidth
            type="email"
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, email: e.target.value });
            }}
          />
        </div>

        <div className="input-container">
          <TextField
            required
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, password: e.target.value });
            }}
          />
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
          Log in
        </button>
        <Typography id="no-account-text">
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </section>
    </form>
  );
}
