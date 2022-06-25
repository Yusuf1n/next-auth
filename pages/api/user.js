export default async function (req, res) {
  const { cookies } = req;

  //   console.log(`Cookies ${cookies.JWTCookie}`);

  const jwt = cookies.JWTCookie;

  if (!jwt) {
    return res.json({ message: "Invalid token!" });
  }

  res.json({ data: "Top secret data!" });

  //   console.log(jwt);

  //   res.json({ message: "Successful!" });
}
