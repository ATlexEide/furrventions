import sqlite3 from "sqlite3";
// import bcrypt from "bcrypt";

//   const salt = await bcrypt.genSalt(12, (err, salt) => {
//     if (err) {
//       console.log("SALTING ERROR", err);
//       return;
//     }
//     return salt;
//   });
//   const hash = await bcrypt.hash(pw, salt, (err, hash) => {
//     if (err) {
//       console.log("HASHING ERROR", err);
//       return;
//     }
//     return hash;
//   });
//   return hash;
// }

export async function createUser(req, res) {
  const values = [
    req.body.isOrganizer,
    req.body.username,
    req.body.firstname,
    req.body.surname,
    req.body.dob,
    req.body.country,
    req.body.phone,
    req.body.email,
    // req.body.password,
    await req.body.password,
  ];

  const sqlString = `INSERT INTO users (isOrganizer, username, first_name, last_name, birthday, country_code, phone, email, pw_hash) VALUES (?,?,?,?,?,?,?,?,?)`;
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
