export default function LoginDetails({ tempUser, setTempUser }) {
  return (
    <section id="add-login">
      <label htmlFor="firstname">Email:</label>
      <input
        id="email"
        type="email"
        onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
      />{" "}
      <label htmlFor="firstname">Password:</label>
      <input
        id="password"
        type="password"
        onChange={(e) => setTempUser({ ...tempUser, pw: e.target.value })}
      />
    </section>
  );
}
