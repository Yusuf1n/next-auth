import { NextResponse } from "next/server";
// import { verify } from "jsonwebtoken";
// import { useRouter } from "next/router";
// import { jwt } from "jsonwebtoken";

const secret = `${process.env.SECRET}`;
// const router = useRouter();

export default function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.JWTCookie;
  const url = req.url;
  //   console.log(`jwt ${jwt}`);
  const login = req.nextUrl.clone();
  login.pathname = "/login";
  const home = req.nextUrl.clone();
  home.pathname = "/";

  // if (url.includes("/login") || url.includes("/register")) {
  //   if (jwt) {
  //     return NextResponse.redirect(home);
  //   }
  //   return NextResponse.next();
  // }

  // if (url.includes("/dashboard") || url.includes("/")) {
  //   if (jwt === undefined) {
  //     return NextResponse.redirect(login);
  //   }

  // try {
  //   verify(jwt, secret);
  //   jwtVerify(jwt, secret);
  //   return NextResponse.next();
  // } catch (e) {
  //   return NextResponse.redirect(login);
  // }
  // const email = jwt.verify(jwt, secret);
  // console.log(email);
  // }
  // return NextResponse.next();
}
