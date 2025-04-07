import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn({ supabase }) {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginDetails.email,
      password: loginDetails.password
    });
    if (error) console.log(error);
    if (data) navigate("/");
    console.log(data);
  }
  return (
    <form id="signin-account">
      <section>
        <h2>Log in</h2>
      </section>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        required
        onChange={(e) => {
          setLoginDetails({ ...loginDetails, email: e.target.value });
        }}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        required
        onChange={(e) => {
          setLoginDetails({ ...loginDetails, password: e.target.value });
        }}
      />
      <section>
        <button
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
        >
          Log in
        </button>
      </section>
    </form>
  );
}
