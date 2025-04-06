import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../styles/Forms.css";

import UserNames from "./FormComponents/UserNames";

export default function SignUp() {
  const [page, setPage] = useState(0);
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

  const pages = [
    {
      title: "Name and username",
      component: <UserNames tempUser={tempUser} setTempUser={setTempUser} />
    },
    { title: "Contact info" },
    { title: "" }
  ];

  return (
    <form id="register-account">
      <section>
        <h2>Create an account</h2>
        <h3>{pages[page].title}</h3>
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
      <section>
        {Boolean(page) && (
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(tempUser);
              setPage(page - 1);
            }}
          >
            LOG USER
          </button>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </section>
    </form>
  );
}
