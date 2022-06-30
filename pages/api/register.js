import bcrypt from "bcrypt";

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
    const checkEmail = await sql.execute(
      `SELECT * FROM Users WHERE email = '${email}'`,
      db.nextjsDb
    );
    // res.json(checkEmail);

    if (checkEmail.rowsAffected[0] === 0) {
      bcrypt.hash(password, 10, async function (err, hash) {
        const handlePOST = await sql.execute(
          `INSERT INTO Users (name, email, password) VALUES ('${name}', '${email}', '${hash}')`,
          db.nextjsDb
        );
        res.status(200).json(handlePOST);
      });
    } else {
      res
        .status(401)
        .json({ message: `An account with the email ${email} already exists` });
    }
  }
}
