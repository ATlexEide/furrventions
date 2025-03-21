import sqlite3 from "sqlite3";

export async function attendConvention(req, res) {
  const sqlString = `INSERT INTO attendees (
                            user_id,
                            convention_id
                            )
                            VALUES (?,?);`;
  // eslint-disable-next-line no-undef
  const db = new sqlite3.Database(process.env.DB_PATH, sqlite3.OPEN_READWRITE);

  const values = [req.body.userId, Number(req.params.id)];
  db.all(sqlString, values, (e) => {
    if (e !== null) {
      console.log(e);
      console.log(e.errno);
      res.send({ status: `ERROR OCCURED`, error: e, errorMessage: e.message });
    }
    if (e === null) {
      res.send({ status: 200 });
    }
  });
  db.close();
}
