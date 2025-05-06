import { useEffect, useState } from "react";
// CSS
import "../../styles/Forms.css";
import { redirect } from "react-router-dom";
import UserLoading from "../SignupFormComponents/UserLoading";

export default function SignUp({ supabase }) {
  const [isValid, setIsValid] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [invalidPasswordLength, setInvalidPasswordLength] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);

  const [userCreated, setUserCreated] = useState(false);

  const [tempUser, setTempUser] = useState({
    repeat_pw: "",
    pw: "",
    email: "",

    furname: "",
    firstname: "",
    lastname: "",
    display_name: ""
  });

  useEffect(() => {
    function setTimer() {
      let checkUsernameTimeout = setTimeout(() => {
        checkUsername(tempUser.furname);
        console.log("YIPPIE");
      }, 650);
      console.log(checkUsernameTimeout);
      checkUsernameTimeout--;
      return checkUsernameTimeout;
    }
    clearTimeout(setTimer());
  }, [tempUser.furname]);

  useEffect(() => {
    setIsValid(true);
    if (
      tempUser.furname &&
      tempUser.firstname &&
      tempUser.email &&
      tempUser.pw &&
      tempUser.repeat_pw &&
      !invalidEmail &&
      !passwordMismatch &&
      !invalidPasswordLength &&
      !invalidUsername
    )
      setIsValid(true);
    else setIsValid(false);
  }, [tempUser]);

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

    if (error)
      throw new Error(`Creating public user profile failed | Code: ${error.code}
    Message: ${error.message}
    Hint: ${error.hint}`);

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
    redirect("/conventions");
  }

  async function checkUsername(name) {
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("username", name);

    if (error) console.log(error);

    if (data[0]?.username === name) {
      setInvalidUsername(true);
    } else {
      setInvalidUsername(false);
    }
  }

  return (
    <form id="register-account">
      {!userCreated && (
        <>
          <section>
            <h2>Create an account</h2>
          </section>
          <section id="add-names">
            <div className="input-container">
              <label htmlFor="firstname">First name*</label>
              <input
                id="firstname"
                type="text"
                value={tempUser.firstname}
                onChange={(e) => {
                  setTempUser({ ...tempUser, firstname: e.target.value });
                }}
              />
            </div>
            <div className="input-container">
              <label htmlFor="lastname">Last name</label>
              <input
                id="lastname"
                type="text"
                value={tempUser.lastname}
                onChange={(e) =>
                  setTempUser({ ...tempUser, lastname: e.target.value })
                }
              />
            </div>
            <div className="input-container">
              <label htmlFor="furname">Furname (Username)*</label>
              <input
                id="furname"
                type="text"
                value={tempUser.furname}
                onChange={(e) => {
                  setTempUser({ ...tempUser, furname: e.target.value });
                }}
              />
              {invalidUsername && <p>Username taken</p>}
            </div>
          </section>
          <section id="inputs">
            <div className="input-container">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={tempUser.email}
                onChange={(e) => {
                  setTempUser({ ...tempUser, email: e.target.value });
                  if (
                    String(e.target.value)
                      .toLowerCase()
                      .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      )
                  )
                    setInvalidEmail(false);
                  else setInvalidEmail(true);
                }}
              />
              {invalidEmail && <p>Invalid email</p>}
            </div>
            <div className="input-container">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={tempUser.pw}
                onChange={(e) => {
                  setTempUser({ ...tempUser, pw: e.target.value });
                  if (e.target.value.length < 8) setInvalidPasswordLength(true);
                  else setInvalidPasswordLength(false);
                  if (e.target.value === tempUser.repeat_pw)
                    setPasswordMismatch(false);
                  else setPasswordMismatch(true);
                }}
              />
            </div>
            <div className="input-container">
              <label htmlFor="repeat-password">Repeat Password:</label>
              <input
                id="repeat-password"
                type="password"
                value={tempUser.repeat_pw}
                onChange={(e) => {
                  setTempUser({ ...tempUser, repeat_pw: e.target.value });
                  if (e.target.value === tempUser.pw)
                    setPasswordMismatch(false);
                  else setPasswordMismatch(true);
                }}
              />
            </div>
            {passwordMismatch && <p>Passwords does not match</p>}
            {invalidPasswordLength && (
              <p>Password must be atleast 8 characters long</p>
            )}
          </section>
          <section>
            <button
              disabled={!isValid}
              onClick={(e) => {
                e.preventDefault();
                signUpNewUser();
              }}
            >
              Sign up
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setUserCreated(true);
              }}
            >
              Sign up
            </button>
          </section>
        </>
      )}
      {userCreated && <UserLoading />}
    </form>
  );
}
