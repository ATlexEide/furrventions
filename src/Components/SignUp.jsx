import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../styles/Forms.css";

export default function SignUp() {
  const [supabase] = useState(() => {
    return createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );
  });
  const [tempUser, setTempUser] = useState({
    pw: "",
    email: "",

    furname: "",
    firstname: "",
    lastname: "",
    display_name: ""
  });

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: tempUser.email,
      password: tempUser.pw,
      options: {
        emailRedirectTo: "https://furrventions.com/",
        data: {
          first_name: tempUser.firstname,
          last_name: tempUser.lastname,
          furname: tempUser.furname
        }
      }
    });

    if (error) console.log("Error:", error);
    while (!data) {
      console.log("Loading...");
    }
    console.log("userData:", data);
  }

  return (
    <form id="register-account">
      <section>
        <h2>Create an account</h2>
      </section>
      <section id="add-names">
        <label htmlFor="firstname">First name:</label>
        <input
          id="firstname"
          type="text"
          onChange={(e) =>
            setTempUser({ ...tempUser, firstname: e.target.value })
          }
        />
        <label htmlFor="firstname">Last name:</label>
        <input
          id="lastname"
          type="text"
          onChange={(e) =>
            setTempUser({ ...tempUser, lastname: e.target.value })
          }
        />
        <label htmlFor="firstname">Furname (Username):</label>
        <input
          id="furname"
          type="text"
          onChange={(e) =>
            setTempUser({
              ...tempUser,
              display_name: e.target.value,
              furname: e.target.value
            })
          }
        />
      </section>
      <section id="add-login">
        <label htmlFor="firstname">Email:</label>
        <input
          id="email"
          type="email"
          onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
        />{" "}
        <label htmlFor="firstname">Password:</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setTempUser({ ...tempUser, pw: e.target.value })}
        />
      </section>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log(tempUser);
        }}
      >
        LOG USER
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          signUpNewUser();
        }}
      >
        Test
      </button>
    </form>
  );
}
