import { serialize } from "cookie";

export default async function (req, res) {
  const { cookies } = req;
  const jwt = cookies.JWTCookie;

  if (!jwt) {
    return res.json({ message: "You are already logged out" });
  } else {
    const serialised = serialize("JWTCookie", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "Successfully logged out!" });
  }
}
