import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <form id="login">
      <h2>Log in</h2>
      <section id="login-inputs">
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </section>
      <section id="login-buttons">
        <button
          onClick={() => {
            alert("LOGIN LODIC");
          }}
        >
          Login
        </button>
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Dont have an account?
        </button>
      </section>
    </form>
  );
}
