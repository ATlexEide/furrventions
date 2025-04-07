import { useState } from "react";
// CSS
import "../styles/Forms.css";

// Form components
import UserNames from "./FormComponents/UserNames";
import LoginDetails from "./FormComponents/LoginDetails";
import UserLoading from "./FormComponents/UserLoading";
import AccountCreated from "./FormComponents/AccountCreated";

export default function SignUp({ supabase }) {
  const [page, setPage] = useState(0);
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
      email: "contact@alexandereide.com", //tempUser.email,
      password: "passord123", // tempUser.pw,
      options: {
        emailRedirectTo: "https://furrventions.com/",
        data: {
          first_name: "Alex", //tempUser.firstname,
          last_name: "E", //tempUser.lastname,
          furname: "Test" // tempUser.furname
        }
      }
    });

    if (error) console.log("Error:", error);
    while (!data) {
      console.log("Loading...");
    }
    console.log(data);
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
      <button
        onClick={(e) => {
          e.preventDefault();
          signUpNewUser();
        }}
      >
        Test
      </button>
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
              setPage(page - 1);
            }}
          >
            Back
          </button>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (pages[page].title === "Login details") {
              signUpNewUser();
              return;
            }
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </section>
    </form>
  );
}
