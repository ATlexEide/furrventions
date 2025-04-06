import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// CSS
import "../styles/Forms.css";

// Form components
import UserNames from "./FormComponents/UserNames";
import LoginDetails from "./FormComponents/LoginDetails";
import UserLoading from "./FormComponents/UserLoading";
import AccountCreated from "./FormComponents/AccountCreated";

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
  }
  console.log("userData:", tempUser);

  const pages = [
    {
      title: "Name and username",
      component: <UserNames tempUser={tempUser} setTempUser={setTempUser} />
    },
    {
      title: "Login details",
      component: <LoginDetails tempUser={tempUser} setTempUser={setTempUser} />
    },
    { title: "", component: <UserLoading /> },
    { title: "", component: <AccountCreated /> }
  ];

  return (
    <form id="register-account">
      <section>
        <h2>Create an account</h2>
        <h3>{pages[page].title}</h3>
      </section>
      {pages[page].component}
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
