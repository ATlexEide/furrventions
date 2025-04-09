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
  }

  function validate() {
    let isValid = true;
    switch (pages[page].title) {
      case "Login details":
        signUpNewUser();
        break;

      case "Name and username":
        console.log("YIPP");
        // firstnameInput.className = "error"
        if (!tempUser.firstname || !tempUser.lastname) {
          alert("First and Last names required");
          isValid = false;
        }
        if (!tempUser.furname) {
          alert("Furname/Username required");
          isValid = false;
        }
        break;
      default:
        break;
    }
    if (isValid) setPage(page + 1);
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
              setPage(page - 1);
            }}
          >
            Back
          </button>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            validate();
          }}
        >
          Next
        </button>
      </section>
    </form>
  );
}
