import sqlite3 from "sqlite3";

export async function getAllConventions(req, res) {
  const sqlString = `SELECT * FROM conventions;`;
  // eslint-disable-next-line no-undef
  const db = new sqlite3.Database(process.env.DB_PATH, sqlite3.OPEN_READWRITE);
  db.all(sqlString, (e, rows) => {
    if (e !== null) {
      console.log(e);
      console.log(e.errno);
      res.send({
        status: `ERROR OCCURED`,
        error: e,
        errorMessage: e.message,
      });
    }
    if (e === null) res.send(rows);
  });
  db.close();
}

export async function getOrganizerConventions(req, res) {
  console.log(req.params.id);
  const sqlString = `SELECT * FROM conventions WHERE organizer_id = ${req.params.id};`;
  // eslint-disable-next-line no-undef
  const db = new sqlite3.Database(process.env.DB_PATH, sqlite3.OPEN_READWRITE);
  db.all(sqlString, (e, rows) => {
    if (e !== null) {
      console.log(e);
      console.log(e.errno);
      res.send({
        status: `ERROR OCCURED`,
        error: e,
        errorMessage: e.message,
      });
    }
    if (e === null) res.send(rows);
  });
  db.close();
}
