import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Utils
import { getCountryDataList, getEmojiFlag } from "countries-list";
console.log(getCountryDataList());
export default function Signup() {
  const [userInfo, setUserInfo] = useState({});
  console.log(userInfo);
  const navigate = useNavigate();
  return (
    <form id="signup">
      <h2>Create an account</h2>

      <section id="signup-inputs">
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="First Name"
          value={userInfo.firstname}
          onChange={(e) => {
            console.log(e.target.value);
            setUserInfo({ ...userInfo, firstname: e.target.value });
          }}
        />

        <input
          type="text"
          name="surname"
          id="surname"
          placeholder="Surname"
          value={userInfo.surname}
          onChange={(e) => {
            setUserInfo({ ...userInfo, surname: e.target.value });
          }}
        />

        <select
          onChange={(e) => {
            setUserInfo({ ...userInfo, country: e.target.value });
          }}
        >
          {getCountryDataList().map((country, i) => (
            <option key={i}>
              {getEmojiFlag(country)}
              {country.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nickname"
          value={userInfo.username}
          onChange={(e) => {
            setUserInfo({ ...userInfo, username: e.target.value });
          }}
        />

        <input
          type="date"
          name="dob"
          id="dob"
          placeholder="Enter your birthday"
          value={userInfo.dob}
          onChange={(e) => {
            setUserInfo({ ...userInfo, dob: e.target.value });
          }}
        />

        <label htmlFor="isOrganizer">Do you organize events?</label>
        <input
          type="checkbox"
          name="isOrganizer"
          id="isOrganizer"
          value={userInfo.isOrganizer ? userInfo.isOrganizer : 0}
          onChange={(e) => {
            setUserInfo({ ...userInfo, isOrganizer: e.target.checked ? 1 : 0 });
          }}
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
          }}
        />

        <input
          type="password"
          name="reenter-password"
          id="reenter-password"
          placeholder="Reenter password"
          value={userInfo.reenterPass}
          onChange={(e) => {
            setUserInfo({ ...userInfo, reenterPass: e.target.value });
          }}
        />
      </section>

      <section id="signup-buttons">
        <button
          onClick={(e) => {
            e.preventDefault();
            fetch("http://localhost:3000/create/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userInfo),
            })
              .then((res) => res.json())
              .then((res) => console.log(res));
            console.log("USEROBJECT: ", userInfo);
          }}
        >
          Sign up
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
          Already have an account?
        </button>
      </section>
    </form>
  );
}
