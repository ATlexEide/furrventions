import sqlite3 from "sqlite3";

export async function createConvention(req, res) {
  const sqlString = `INSERT INTO conventions (
                            start_time,
                            end_time,
                            convention_name,
                            convention_description,
                            organizer_id
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
      res.send({
        status: `ERROR OCCURED`,
        error: e,
        errorMessage: e.message,
      });
    }
    if (e === null) {
      res.send({ status: 200 });
    }
  });
  db.close();
}
