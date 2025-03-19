import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  return (
    <form id="signup">
      <h2>Create an account</h2>
      <section id="signup-inputs">
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="First Name"
        />
        <input type="text" name="surname" id="surname" placeholder="Surname" />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <input
          type="passwor"
          name="reenter-password"
          id="reenter-password"
          placeholder="Reenter password"
        />
      </section>
      <section id="signup-buttons">
        <button
          onClick={(e) => {
            e.preventDefault();
            alert("SIGNUP LODIC");
          }}
        >
          Sign up
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
          Already have an account?
        </button>
      </section>
    </form>
  );
}
