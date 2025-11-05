export default function LoginDetails({ errors, tempUser, setTempUser }) {
  return (
    <section id="inputs">
      <div className="input-container">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={tempUser.email}
          onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
        />
        {errors.invalidEmail && <p>Invalid email</p>}
      </div>
      <div className="input-container">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={tempUser.pw}
          onChange={(e) => setTempUser({ ...tempUser, pw: e.target.value })}
        />
      </div>
      <div className="input-container">
        <label htmlFor="repeat-password">Repeat Password:</label>
        <input
          id="repeat-password"
          type="password"
          value={tempUser.repeat_pw}
          onChange={(e) =>
            setTempUser({ ...tempUser, repeat_pw: e.target.value })
          }
        />
      </div>

      {errors.pWMismatchWarning && <p>Passwords does not match</p>}
      {errors.pWLengthWarning && (
        <p>Password must be atleast 8 characters long</p>
      )}
    </section>
  );
}
