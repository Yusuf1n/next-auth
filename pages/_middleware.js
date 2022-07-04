import { NextResponse } from "next/server";
// import { verify } from "jsonwebtoken";

const secret = `${process.env.SECRET}`;

export default function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.JWTCookie;
  const url = req.url;

  const login = req.nextUrl.clone();
  login.pathname = "/login";
  const home = req.nextUrl.clone();
  home.pathname = "/";

  if (url.includes("/login") || url.includes("/register")) {
    if (jwt) {
      return NextResponse.redirect(home);
    }
    return NextResponse.next();
  }

  if (!url.includes("/login") || !url.includes("/register")) {
    if (jwt === undefined) {
      return NextResponse.redirect(login);
    }

    // try {
    //   verify(jwt, secret);
    //   return NextResponse.next();
    // } catch (e) {
    //   return NextResponse.redirect(login);
    // }
  }
  return NextResponse.next();
}
