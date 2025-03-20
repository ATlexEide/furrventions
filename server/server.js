import express from "express";
import "dotenv/config";
import cors from "cors";
import { createUser } from "./Handler/createUserHandler.js";
// console.log(import.meta.env.DB_PATH);

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.post("/create/user", (req, res) => {
  createUser(req, res);
});
app.get("/test", (req, res) => {
  console.log(req.body);
  res.send({ hello: "test" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// ///////// TESTING AREA
// const testUser = {
//   isOrganizer: false,
//   username: "Velvet",
//   firstname: "Alex",
//   surname: "Eide",
//   dob: "1700-01-01",
//   country: "norway",
//   phone: 123456,
//   email: "contact@alexandereide.com",
//   password: "passord123",
// };
// import sqlite3 from "sqlite3";

// export function createUser(userObject) {
//   const sqlString = `INSERT INTO users (isOrganizer, username, first_name, last_name, birthday, country_code, phone, email, pw_hash) VALUES (?,?,?,?,?,?,?,?,?)`;
//   const values = [
//     userObject.isOrganizer,
//     userObject.username,
//     userObject.firstname,
//     userObject.surname,
//     userObject.dob,
//     userObject.country,
//     userObject.phone,
//     userObject.email,
//     userObject.password,
//   ];

//   // eslint-disable-next-line no-undef
//   const db = new sqlite3.Database(process.env.DB_PATH, sqlite3.OPEN_READWRITE);
//   db.all(sqlString, values, (rows) => {
//     console.log(sqlString);
//     console.log(values);
//     console.log(rows);
//   });
//   db.close();
// }

// createUser(testUser);
