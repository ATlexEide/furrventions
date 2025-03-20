import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  const sqlString = `INSERT INTO users (
                            isOrganizer,
                            username,
                            first_name,
                            last_name,
                            birthday,
                            country_code,
                            phone,
                            email,
                            pw_hash
                            )
                            VALUES (?,?,?,?,?,?,?,?,?)`;
  // eslint-disable-next-line no-undef
  const db = new sqlite3.Database(process.env.DB_PATH, sqlite3.OPEN_READWRITE);

  const values = [
    req.body.isOrganizer,
    req.body.username,
    req.body.firstname,
    req.body.surname,
    req.body.dob,
    req.body.country,
    req.body.phone,
    req.body.email,
  ];

  bcrypt.hash(req.body.password, 12, function (err, hash) {
    if (err) console.log(err);
    else {
      console.log(hash);
      values.push(hash);
      db.all(sqlString, values, (e) => {
        if (e !== null) {
          console.log(e);
          console.log(e.errno);
          res.send({ status: `ERROR OCCURED`, error: e.errno });
        }
        if (e === null) res.send({ status: 200 });
      });
      db.close();
    }
  });
}
