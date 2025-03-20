import sqlite3 from "sqlite3";

export function createUser(req, res) {
  const sqlString = `INSERT INTO users (isOrganizer, username, first_name, last_name, birthday, country_code, phone, email, pw_hash) VALUES (?,?,?,?,?,?,?,?,?)`;
  const values = [
    req.body.isOrganizer,
    req.body.username,
    req.body.firstname,
    req.body.surname,
    req.body.dob,
    req.body.country,
    req.body.phone,
    req.body.email,
    req.body.password,
  ];
  // eslint-disable-next-line no-undef
  const db = new sqlite3.Database(process.env.DB_PATH, sqlite3.OPEN_READWRITE);
  db.all(sqlString, values, (e) => {
    console.log(sqlString);
    console.log(values);
    console.log(e);
    if (e !== null) {
      res.send({ status: `ERROR OCCURED` });
    }
    if (e === null) res.send({ status: 200 });
  });
  db.close();
}
