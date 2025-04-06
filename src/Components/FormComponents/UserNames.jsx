export default function UserNames({ tempUser, setTempUser }) {
  return (
    <section id="add-names">
      <label htmlFor="firstname">First name:</label>
      <input
        id="firstname"
        type="text"
        onChange={(e) =>
          setTempUser({ ...tempUser, firstname: e.target.value })
        }
      />
      <label htmlFor="firstname">Last name:</label>
      <input
        id="lastname"
        type="text"
        onChange={(e) => setTempUser({ ...tempUser, lastname: e.target.value })}
      />
      <label htmlFor="firstname">Furname (Username):</label>
      <input
        id="furname"
        type="text"
        onChange={(e) =>
          setTempUser({
            ...tempUser,
            display_name: e.target.value,
            furname: e.target.value
          })
        }
      />
    </section>
  );
}
