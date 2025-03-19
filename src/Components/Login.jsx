export default function Login() {
  return (
    <form id="login">
      <section id="login-inputs">
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </section>
    </form>
  );
}
