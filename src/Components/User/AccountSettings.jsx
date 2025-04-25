import { useState } from "react";

export default function AccountSettings({ user }) {
  const [editingFurname, setEditingFurname] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  return (
    <ul id="account-details">
      <li>
        <h4>
          <strong>Username:</strong>
        </h4>

        <p>
          {user.user_metadata.furname}
          <button
            className="edit-info-btn"
            onClick={() => {
              setEditingFurname(!editingFurname);
            }}
          >
            ✎
          </button>
        </p>
        {editingFurname && <input value={user.user_metadata.furname} />}
      </li>

      <li>
        <h4>
          <strong>Email:</strong>
        </h4>
        <p>
          {user.user_metadata.email}
          <button
            className="edit-info-btn"
            onClick={() => {
              setEditingEmail(!editingEmail);
            }}
          >
            ✎
          </button>
        </p>
        {editingEmail && <input value={user.user_metadata.email} />}
      </li>
    </ul>
  );
}
