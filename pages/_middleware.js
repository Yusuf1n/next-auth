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
  const domain = req.nextUrl.clone();
  domain.pathname = "/login";
  const domain2 = req.nextUrl.clone();
  domain2.pathname = "/";

  if (url.includes("/login")) {
    if (jwt) {
      return NextResponse.redirect(domain2);
    }
    return NextResponse.next();
  }

  if (url.includes("/dashboard")) {
    if (jwt === undefined) {
      return NextResponse.redirect(domain);
    }
    // try {
    //   //   verify(jwt, secret);
    //   jwtVerify(jwt, secret);
    //   return NextResponse.next();
    // } catch (e) {
    //   return NextResponse.redirect(domain);
    // }
    // const email = jwt.verify(jwt, secret);
    // console.log(email);
  }
  return NextResponse.next();
}
