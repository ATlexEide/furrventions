import { TextField } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import { useState } from "react";
import { supabase } from "../../utils/SupabaseUtils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

import "../../styles/ResetPassword.css";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isNotValid = newPassword.length < 8;
  const navigate = useNavigate();
  async function handleUpdate() {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) {
      console.log(error.code);
      switch (error.code) {
        case "same_password":
          alert("New password should be different from the old password.");
          return;

        default:
          break;
      }
      console.log(error);
      alert("Failed to reset password");
    }
    if (data.user) {
      alert("Password updated");
      navigate("/");
    }
  }
  return (
    <section id="reset-password">
      <h2>Reset password</h2>
      <div className="input-container">
        <TextField
          id="password"
          type={isPasswordVisible ? "text" : "password"}
          value={newPassword ? newPassword : ""}
          label={
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <PasswordIcon /> New Password
            </span>
          }
          variant="outlined"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <span
          className="password-visibility-toggle-container"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </span>
      </div>
      <button
        disabled={isNotValid}
        onClick={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        Submit
      </button>
    </section>
  );
}
