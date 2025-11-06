import { useState, useEffect, use } from "react";
import { TextField } from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";

import "../../styles/AccountPage.css";
import "../../styles/Forms.css";
import {
  checkIsEmailTaken,
  getUserSession,
  logout,
  sendResetPasswordLink,
  updateUser,
  checkIsUsernameTaken
} from "../../utils/SupabaseUtils";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [tempUser, setTempUser] = useState({});
  const [hasUpdates, setHasUpdates] = useState(false);
  const [invalidFurname, setInvalidFurname] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isTypingFurname, setIsTypingFurname] = useState(false);
  const [isTypingEmail, setIsTypingEmail] = useState(false);

  const [session, setSession] = useState(null);

  async function getSession() {
    if (session) return;
    setSession(await getUserSession());
  }

  useEffect(() => {
    if (!session) {
      getSession();
      return;
    }
    if (session) {
      setUser(session.user);
      setTempUser({
        furname: session.user.user_metadata.furname,
        email: session.user.email
      });
    }
  }, [session]);

  async function handleUpdate() {
    const nameChange = Boolean(
      tempUser.furname && tempUser.furname !== user.user_metadata.furname
    );

    const emailChange = Boolean(
      tempUser.email && tempUser.email !== user.user_metadata.email
    );

    const payload = { user_id: user.id };
    nameChange ? (payload.data = { furname: tempUser.furname }) : null;
    emailChange ? (payload.email = tempUser.email) : null;
    console.clear();
    console.log(payload);
    await updateUser(payload);
  }

  // Furname
  useEffect(() => {
    if (!user) return;
    if (tempUser.furname === user.user_metadata.furname) {
      setHasUpdates(false);
      setIsTypingFurname(false);
      return;
    }
    function setTimer() {
      setInvalidFurname(false);
      if (!tempUser.furname || tempUser.furname === "") {
        setHasUpdates(false);
        setIsTypingFurname(false);
        return;
      }

      let checkUsernameTimeout = setTimeout(async () => {
        if (await checkIsUsernameTaken(tempUser.furname)) {
          setInvalidFurname(true);
          setHasUpdates(false);
          setIsTypingFurname(false);
        } else {
          setInvalidFurname(false);
          setHasUpdates(true);
          setIsTypingFurname(false);
        }
      }, 650);
      checkUsernameTimeout--;
      return checkUsernameTimeout;
    }
    clearTimeout(setTimer());

    if (tempUser.furname || tempUser === "") {
      setHasUpdates(false);
      setIsTypingFurname(false);
      return;
    }
    setHasUpdates(false);
  }, [tempUser.furname]);

  // Email
  useEffect(() => {
    if (!user) return;
    if (tempUser.email === user.email) {
      setHasUpdates(false);
      setIsTypingEmail(false);
      return;
    }

    function setTimer() {
      if (!tempUser.email || tempUser.email === "") {
        setHasUpdates(false);
        setIsTypingEmail(false);
        return;
      }

      let checkEmailTimeout = setTimeout(async () => {
        if (await checkIsEmailTaken(tempUser.email)) {
          setInvalidEmail(true);
          setHasUpdates(false);
          setIsTypingEmail(false);
        } else {
          setInvalidEmail(false);
          setHasUpdates(true);
          setIsTypingEmail(false);
        }
      }, 650);
      checkEmailTimeout--;
      return checkEmailTimeout;
    }
    clearTimeout(setTimer());

    if (
      !String(tempUser.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setHasUpdates(false);
      return;
    }

    if (tempUser.email) {
      setHasUpdates(true);
      return;
    }
    setHasUpdates(true);
  }, [tempUser.email]);

  if (!user) return <h2>Log in to manage your account</h2>;
  return (
    <section id="account-page">
      <h2 id="account-page-header">
        Manage Account ({user.user_metadata.furname})
      </h2>
      <h4 id="heading-manage-id">
        ↓↓ ACCOUNT ID ↓↓ <br />
        {user.id}
      </h4>

      <br />
      <hr />

      <section id="user-details">
        <h3 id="heading-manage">User details</h3>

        <div className="input-container">
          <TextField
            error={invalidFurname && tempUser.furname !== ""}
            helperText={
              invalidFurname && tempUser.furname !== ""
                ? `"${tempUser.furname}" is unavailable`
                : null
            }
            id="manage-furname"
            value={tempUser.furname ? tempUser.furname : ""}
            label={
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <BadgeIcon />{" "}
                {isTypingFurname ? "Checking availability..." : "Furname"}
              </span>
            }
            variant="outlined"
            onChange={(e) => {
              setIsTypingFurname(true);
              setTempUser({ ...tempUser, furname: e.target.value });
            }}
          />
        </div>

        <div className="input-container">
          <TextField
            error={invalidEmail && tempUser.email !== ""}
            helperText={
              invalidEmail && tempUser.email !== ""
                ? `"${tempUser.email}" is unavailable`
                : null
            }
            type="email"
            id="manage-email"
            value={tempUser.email ? tempUser.email : ""}
            label={
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <EmailIcon />{" "}
                {isTypingEmail ? "Checking availability..." : "Email"}
              </span>
            }
            variant="outlined"
            onChange={(e) => {
              setHasUpdates(false);
              setIsTypingEmail(true);
              setTempUser({ ...tempUser, email: e.target.value });
            }}
          />
        </div>

        <section className="manage-account-btns">
          <button
            onClick={() => {
              sendResetPasswordLink(user.email);
            }}
          >
            Reset password
          </button>

          <button
            disabled={!hasUpdates || isTypingFurname || isTypingEmail}
            onClick={handleUpdate}
          >
            Update
          </button>
        </section>
      </section>

      <hr />

      <section className="manage-account-btns danger-zone">
        <button className="red-btn" onClick={logout}>
          LOG OUT
        </button>
        <button
          disabled={true}
          className="red-btn"
          onClick={() => {
            const phrase = prompt(
              `Enter "DELETE ${user.user_metadata.furname}" to permanently delete your account`
            );
            if (phrase === `DELETE ${user.user_metadata.furname}`) {
              alert("yipp");
            }
          }}
        >
          DELETE ACCOUNT
        </button>
      </section>
    </section>
  );
}
