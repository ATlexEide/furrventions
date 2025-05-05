import { useEffect, useState } from "react";
// CSS
import "../../styles/Forms.css";

// Form components
import UserNames from "../SignupFormComponents/UserNames";
import LoginDetails from "../SignupFormComponents/LoginDetails";
import UserLoading from "../SignupFormComponents/UserLoading";
import AccountCreated from "../SignupFormComponents/AccountCreated";

export default function SignUp({ supabase }) {
  const [isNotValid, setIsNotValid] = useState(true);
  const [page, setPage] = useState(0);
  const [errors, setErrors] = useState({
    pWLengthWarning: false,
    pWMismatchWarning: false,
    invalidEmail: false
  });

  const [tempUser, setTempUser] = useState({
    repeat_pw: null,
    pw: null,
    email: null,

    furname: null,
    firstname: null,
    lastname: null,
    display_name: null
  });

  // useEffect(() => {
  //   checkUsername();
  // }, [tempUser.furname]);
  useEffect(() => {
    validate();
  }, [tempUser]);
  useEffect(() => {
    if (
      errors.pWMismatchWarning ||
      errors.pWLengthWarning ||
      errors.invalidEmail
    )
      setIsNotValid(false);
    else setIsNotValid(true);
  }, [errors]);

  console.log(errors);
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
    if (error) console.log(error);
    if (data.user) createPublicProfile(data.user);
  }

  async function createPublicProfile(user) {
    console.log(user);
    const { error } = await supabase.from("users").insert({
      username: user.user_metadata.furname,
      user_id: user.id
    });
    if (error)
      throw new Error(`Creating public user profile failed | Code: ${error.code}
    Message: ${error.message}
    Hint: ${error.hint}`);
  }

  async function checkUsername(name) {
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("username", name);
    if (error) console.log(error);
    if (data[0]?.username === name) {
      console.log(`${name} is taken`);
    } else {
      console.log(data, "good to go");
    }
  }

  function validate() {
    console.clear();
    switch (pages[page].title) {
      case "Name and username":
        console.log("YIPP");

        if (tempUser.firstname && tempUser.furname) setIsNotValid(false);

        break;

      case "Login details":
        if (
          String(tempUser.email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          setErrors({ ...errors, invalidEmail: false });
        } else {
          setErrors({ ...errors, invalidEmail: true });
        }

        if (!tempUser.pw || !tempUser.repeat_pw) return;

        if (tempUser.repeat_pw === tempUser.pw) {
          {
            setErrors({ ...errors, pWMismatchWarning: false });
          }
        } else {
          setErrors({ ...errors, pWMismatchWarning: true });
        }

        if (tempUser.pw.length < 8) {
          setErrors({ ...errors, pWLengthWarning: true });
        } else setErrors({ ...errors, pWLengthWarning: false });

        break;

      default:
        break;
    }
  }

  console.log("userData:", tempUser);

  const pages = [
    {
      title: "Name and username",
      component: (
        <UserNames
          checkUsername={checkUsername}
          validate={validate}
          tempUser={tempUser}
          setTempUser={setTempUser}
        />
      )
    },
    {
      title: "Login details",
      component: (
        <LoginDetails
          errors={errors}
          tempUser={tempUser}
          setTempUser={setTempUser}
        />
      )
    },
    { title: "", component: <UserLoading /> },
    { title: "", component: <AccountCreated /> }
  ];

  return (
    <form id="register-account">
      <p>is valid = {String(!isNotValid)}</p>
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
          disabled={isNotValid}
          onClick={(e) => {
            e.preventDefault();
            setIsNotValid(true);
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </section>
    </form>
  );
}
