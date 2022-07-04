import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";

const sql = require("../../../sql");
const db = require("../../../db");

const secret = process.env.SECRET;

export default async function (req, res) {
  const { email, password } = req.body;

  const handlePOST = await sql.execute(
    `SELECT * FROM Users WHERE email = '${email}'`,
    db.nextjsDb
  );
  const data = handlePOST.recordset;
  const _name = data[0].name;

  // console.log(handlePOST.recordset[0].password);
  const dbPassword = handlePOST.recordset[0].password;
  bcrypt.compare(password, dbPassword, function (err, result) {
    console.log(result);

    if (result === true) {
      console.log("It is working!");

      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
          email: email,
        },
        secret
      );

      const serialised = serialize("JWTCookie", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialised);
      res.status(200).json({ message: "Success!", name: _name });
    } else if (result === false) {
      console.log("not working");
      res.status(401).json({ message: "Invalid credentials!" });
    }
  });
}
