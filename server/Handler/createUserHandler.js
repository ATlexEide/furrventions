import sqlite3 from "sqlite3";

export function createUser(userObject) {
  const sqlString = `INSERT INTO users (isOrganizer, username, first_name, last_name, birthday, country_code, phone, email, pw_hash) VALUES (?,?,?,?,?,?,?,?,?)`;
  const values = [
    userObject.isOrganizer,
    userObject.username,
    userObject.firstname,
    userObject.surname,
    userObject.dob,
    userObject.country,
    userObject.phone,
    userObject.email,
    userObject.password,
  ];

  // eslint-disable-next-line no-undef
  const db = new sqlite3.Database(process.env.DB_PATH, sqlite3.OPEN_READWRITE);
  db.all(sqlString, values, (rows) => {
    console.log(sqlString);
    console.log(values);
    console.log(rows);
  });
  db.close();
}
