export default function UserNames({ checkUsername, tempUser, setTempUser }) {
  return (
    <section id="add-names">
      <div className="input-container">
        <label htmlFor="firstname">First name*</label>
        <input
          id="firstname"
          type="text"
          value={tempUser.firstname}
          onChange={(e) =>
            setTempUser({ ...tempUser, firstname: e.target.value })
          }
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
            setTempUser({
              ...tempUser,
              display_name: e.target.value,
              furname: e.target.value
            });
            checkUsername(e.target.value);
          }}
          // onBlur={checkUsername}
        />
      </div>
    </section>
  );
}
