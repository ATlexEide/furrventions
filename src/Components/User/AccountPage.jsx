import { useState, useEffect } from "react";
import { TextField } from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";

import "../../styles/AccountPage.css";
import "../../styles/Forms.css";
import {
  getUserSession,
  logout,
  sendResetPasswordLink
} from "../../utils/SupabaseUtils";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [tempUser, setTempUser] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [hasUpdates, setHasUpdates] = useState(false);

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

  // Furname
  useEffect(() => {
    if (!user) return;
    if (tempUser.furname === user.user_metadata.furname) {
      setHasUpdates(false);
      return;
    }

    if (tempUser.furname || tempUser === "") {
      setHasUpdates(true);
      return;
    }
    setHasUpdates(false);
  }, [tempUser.furname]);

  // Email
  useEffect(() => {
    if (!user) return;
    if (tempUser.email === user.email) {
      setHasUpdates(false);
      return;
    }

    if (tempUser.email) {
      setHasUpdates(true);
      return;
    }
    setHasUpdates(false);
  }, [tempUser.email]);

  if (user) console.log(user);
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
            id="manage-furname"
            value={tempUser.furname ? tempUser.furname : ""}
            label={
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <BadgeIcon /> Furname
              </span>
            }
            variant="outlined"
            onChange={(e) => {
              setTempUser({ ...tempUser, furname: e.target.value });
            }}
          />
        </div>

        <div className="input-container">
          <TextField
            type="email"
            id="manage-email"
            value={tempUser.email ? tempUser.email : ""}
            label={
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <EmailIcon /> Email
              </span>
            }
            variant="outlined"
            onChange={(e) => {
              setTempUser({ ...tempUser, email: e.target.value });
            }}
          />
        </div>

        <section className="manage-account-btns">
          <button disabled={!hasUpdates}>Update</button>
          <button
            onClick={() => {
              sendResetPasswordLink(user.email);
            }}
          >
            Reset password
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
