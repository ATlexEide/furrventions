export default function Signup() {
  return (
    <form>
      <section id="signup-inputs">
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="First Name"
        />
        <input type="text" name="surname" id="surname" placeholder="Surname" />
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <input
          type="passwor"
          name="reenter-password"
          id="reenter-password"
          placeholder="Reenter password"
        />
      </section>
    </form>
  );
}
