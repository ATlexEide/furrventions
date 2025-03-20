import sqlite3 from "sqlite3";

export async function createConvention(req, res) {
  const sqlCreateParticipantTableString = `CREATE TABLE ${req.body.name
    .toLowerCase()
    .replace(" ", "")}_participants (
                                            user_id INTEGER REFERENCES users (id),
                                            convention_id INTEGER REFERENCES conventions (id) );`;

  const sqlString = `INSERT INTO conventions (
                            start_time,
                            end_time,
                            convention_name,
                            convention_description,
                            organizerID
                            )
                            VALUES (?,?,?,?,?);`;
  // eslint-disable-next-line no-undef
  const db = new sqlite3.Database(process.env.DB_PATH, sqlite3.OPEN_READWRITE);

  const values = [
    req.body.start,
    req.body.end,
    req.body.name,
    req.body.desc,
    req.body.organizerId,
  ];
  db.all(sqlString, values, (e) => {
    if (e !== null) {
      console.log(e);
      console.log(e.errno);
      res.send({ status: `ERROR OCCURED`, error: e.errno });
    }
    if (e === null) {
      db.run(sqlCreateParticipantTableString);
      res.send({ status: 200 });
    }
  });
  db.close();
}

// CREATE TABLE test (
//     user_id       INTEGER REFERENCES users (id),
//     convention_id INTEGER REFERENCES conventions (id)
// );
