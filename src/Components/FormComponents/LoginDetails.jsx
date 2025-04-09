export default function LoginDetails({ tempUser, setTempUser }) {
  return (
    <section id="inputs">
      <div className="input-container">
        <label htmlFor="firstname">Email:</label>
        <input
          id="email"
          type="email"
          onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
        />
      </div>
      <div className="input-container">
        <label htmlFor="firstname">Password:</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setTempUser({ ...tempUser, pw: e.target.value })}
        />
      </div>
    </section>
  );
}
