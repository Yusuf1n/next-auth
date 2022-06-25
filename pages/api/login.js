import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const sql = require("../../sql");
const db = require("../../db");

const secret = process.env.SECRET;

// export default async function handle(req, res) {
//   const { email, password } = req.body;
//   // console.log(req.body);

//   // if (req.method === "GET") {
//   //   const handleGET = await sql.execute("SELECT * FROM Movie", db.nextjsDb);
//   //   res.json(...handleGET.recordset);
//   // }
//   if (req.method === "POST") {
//     const handleGET = await sql.execute(
//       `SELECT * FROM Users WHERE email = '${email}' AND password = '${password}'`,
//       db.nextjsDb
//     );
//     res.json(handleGET);
//   }
// }

export default async function (req, res) {
  const { email, password } = req.body;

  const handlePOST = await sql.execute(
    `SELECT * FROM Users WHERE email = '${email}' AND password = '${password}'`,
    db.nextjsDb
  );

  const data = handlePOST.rowsAffected[0];
  console.log(handlePOST.rowsAffected[0]);
  // res.json(handlePOST);

  if (data === 1) {
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

    // headers: {
    //   "Set-Cookie", serialize;
    // }
    // }
    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "Success!" });
  } else if (data === 0) {
    console.log("not working");
    res.status(401).json({ message: "Invalid credentials!" });
  }
}
