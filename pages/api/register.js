const sql = require("../../sql");
const db = require("../../db");

export default async function handle(req, res) {
  const { name, email, password } = req.body;
  // console.log(req.body);

  // if (req.method === "GET") {
  //   const handleGET = await sql.execute("SELECT * FROM Movie", db.nextjsDb);
  //   res.json(...handleGET.recordset);
  // }
  if (req.method === "POST") {
    const handlePOST = await sql.execute(
      `INSERT INTO Users (name, email, password) VALUES ('${name}', '${email}', '${password}')`,
      db.nextjsDb
    );
    res.json(handlePOST);
  }
}
