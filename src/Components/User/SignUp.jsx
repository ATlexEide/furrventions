import { useEffect, useState } from "react";
// CSS
import "../../styles/Forms.css";
import { Link } from "react-router-dom";
import UserLoading from "../SignupFormComponents/UserLoading";
import { TextField, Typography } from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  checkIsUsernameTaken,
  checkIsEmailTaken,
  signUpNewUser
} from "../../utils/SupabaseUtils";

export default function SignUp() {
  const [isValid, setIsValid] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [invalidPasswordLength, setInvalidPasswordLength] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);

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
      if (!tempUser.furname) {
        setIsTyping(false);
        return;
      }
      let checkUsernameTimeout = setTimeout(async () => {
        if (await checkIsUsernameTaken(tempUser.furname)) {
          setInvalidUsername(true);
          setIsTyping(false);
        } else {
          setInvalidUsername(false);
          setIsTyping(false);
        }
      }, 650);
      checkUsernameTimeout--;
      return checkUsernameTimeout;
    }
    clearTimeout(setTimer());
  }, [tempUser.furname]);

  useEffect(() => {
    if (invalidEmail) return;
    function setTimer() {
      if (!tempUser.email) {
        setIsTyping(false);
        return;
      }
      let checkEmailTimeout = setTimeout(async () => {
        setCheckingEmail(true);
        if (await checkIsEmailTaken(tempUser.email)) {
          setEmailTaken(true);
          setIsTyping(false);
          setCheckingEmail(false);
        } else {
          setEmailTaken(false);
          setCheckingEmail(false);
          setIsTyping(false);
        }
      }, 650);
      checkEmailTimeout--;
      return checkEmailTimeout;
    }
    clearTimeout(setTimer());
  }, [tempUser.email]);

  useEffect(() => {
    setIsValid(true);
    if (
      tempUser.furname &&
      tempUser.firstname &&
      tempUser.email &&
      tempUser.pw &&
      tempUser.repeat_pw &&
      !emailTaken &&
      !invalidEmail &&
      !passwordMismatch &&
      !invalidPasswordLength &&
      !invalidUsername
    )
      setIsValid(true);
    else setIsValid(false);
  }, [tempUser]);

  return (
    <form id="register-account">
      {!userCreated && (
        <>
          <section>
            <h2>Create an account</h2>
          </section>
          <section id="add-names">
            <div className="input-container">
              <TextField
                fullWidth
                id="firstname"
                value={tempUser.firstname}
                label={
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <BadgeIcon /> First Name *
                  </span>
                }
                variant="outlined"
                onChange={(e) => {
                  setTempUser({ ...tempUser, firstname: e.target.value });
                }}
              />
            </div>

            <div className="input-container">
              <TextField
                fullWidth
                id="lastname"
                value={tempUser.lastname}
                label={
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <BadgeIcon /> Last Name
                  </span>
                }
                variant="outlined"
                onChange={(e) =>
                  setTempUser({ ...tempUser, lastname: e.target.value })
                }
              />
            </div>

            <div className="input-container">
              <TextField
                error={invalidUsername ? true : false}
                helperText={invalidUsername ? "Username taken" : null}
                fullWidth
                id="furname"
                value={tempUser.furname}
                label={
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <AlternateEmailIcon />
                    {isTyping
                      ? "Checking availability..."
                      : "Furname (Username) *"}
                  </span>
                }
                variant="outlined"
                onChange={(e) => {
                  setIsTyping(true);
                  setTempUser({ ...tempUser, furname: e.target.value });
                }}
              />
            </div>

            <div className="input-container">
              <TextField
                error={
                  (invalidEmail && tempUser.email) || emailTaken ? true : false
                }
                helperText={
                  emailTaken
                    ? "Email is already registered"
                    : invalidEmail && tempUser.email
                    ? "Invalid email"
                    : null
                }
                fullWidth
                id="email"
                type="email"
                value={tempUser.email}
                label={
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <EmailIcon />{" "}
                    {`${checkingEmail ? "Checking for email" : "Email *"}`}
                  </span>
                }
                variant="outlined"
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
            </div>
            <div className="input-container-row">
              <TextField
                error={
                  tempUser.password && invalidPasswordLength ? true : false
                }
                helperText={
                  tempUser.password && invalidPasswordLength
                    ? "Password must be atleast 8 characters long"
                    : null
                }
                fullWidth
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                value={tempUser.pw}
                label={
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <PasswordIcon /> Password *
                  </span>
                }
                variant="outlined"
                onChange={(e) => {
                  setTempUser({ ...tempUser, pw: e.target.value });
                  if (e.target.value.length < 8) setInvalidPasswordLength(true);
                  else setInvalidPasswordLength(false);
                  if (e.target.value === tempUser.repeat_pw)
                    setPasswordMismatch(false);
                  else setPasswordMismatch(true);
                }}
              />
              <span
                className="password-visibility-toggle-container"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
            <div className="input-container-row">
              <TextField
                error={tempUser.repeat_pw && passwordMismatch ? true : false}
                helperText={
                  tempUser.repeat_pw && passwordMismatch
                    ? "Passwords does not match"
                    : null
                }
                fullWidth
                id="repeat-password"
                type={isRepeatPasswordVisible ? "text" : "password"}
                value={tempUser.repeat_pw}
                label={
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <PasswordIcon /> Repeat Password *
                  </span>
                }
                variant="outlined"
                onChange={(e) => {
                  setTempUser({ ...tempUser, repeat_pw: e.target.value });
                  if (e.target.value === tempUser.pw)
                    setPasswordMismatch(false);
                  else setPasswordMismatch(true);
                }}
              />
              <span
                className="password-visibility-toggle-container"
                onClick={() =>
                  setIsRepeatPasswordVisible(!isRepeatPasswordVisible)
                }
              >
                {isRepeatPasswordVisible ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </span>
            </div>
          </section>
          <section id="submit-section">
            <button
              disabled={!isValid}
              onClick={(e) => {
                e.preventDefault();
                if (signUpNewUser(tempUser)) setUserCreated(true);
              }}
            >
              Sign up
            </button>
            <Typography id="no-account-text">
              Already have an account? <Link to="/signin">Log In</Link>
            </Typography>
          </section>
        </>
      )}
      {userCreated && <UserLoading />}
    </form>
  );
}
