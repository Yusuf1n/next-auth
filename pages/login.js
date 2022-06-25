import Layout from "../components/layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const sql = require("../sql");
const db = require("../db");

export default function Login({ data }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();

  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    const body = { email, password };
    const response = await axios.post("api/login", body);
    console.log(response);
    // credentials: "include";
    if (response.status === 200) {
      // router.push("dashboard/user");
    }

    // if (data.email === email && data.password === password) {
    //   setMessage(`Welcome ${data.name}`);
    // } else {
    //   setMessage("Wrong login details");
    // }
    {
      data.map((user) => {
        if (user.email === email && user.password === password) {
          setMessage(`Hello ${user.name}`);
          const name = user.name;

          // router.push({
          //   pathname: "/",
          //   query: {
          //     message,
          //   },
          // });

          // const token = sign(
          //   {
          //     exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 30),
          //     email: user.email, // 30 days
          //   },
          //   secret
          // );

          // const serialized = serialize("JWTCookie", token, {
          //   httpOnly: true,
          //   secure: process.env.NODE_ENV !== "development",
          //   sameSite: "strict",
          //   maxAge: 60 * 60 * 24 * 30,
          //   path: "/login",
          // });

          // headers: {
          //   "Set-Cookie", serialize;
          // }

          // console.log(user);
          router.push({
            pathname: "dashboard/user",
            query: { name, email, password },
          });
        }
      });
    }
  };

  // const handleGetUser = async () => {
  //   const user = await axios.get("api/user");

  //   console.log(user);
  // };

  // const handleLogOut = async () => {
  //   const user = await axios.get("api/logout");

  //   console.log(user);
  // };

  return (
    <div>
      <Layout
        form={
          <form
            onSubmit={submit}
            // onSubmit={submit}
          >
            {/* <h1 className="h3 mb-3 fw-normal">{message}</h1> */}
            {/* {data.map((user) =>
            user.email === email && user.password === password ? (
              <h1>hello {user.name}</h1>
            ) : (
              <h1></h1>
            )
          )} */}
            <h1>{message}</h1>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              // type="password"
              className="form-control"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
          </form>
        }
      />
      {/* <button onClick={() => handleGetUser()}>User</button>
      <button onClick={() => handleLogOut()}>Log Out</button> */}
    </div>
  );
}

export async function getServerSideProps() {
  const execQuery = await sql.execute(`SELECT * FROM Users`, db.nextjsDb);

  const data = execQuery.recordset;
  console.log(data);

  return {
    props: {
      data,
    },
  };
}
