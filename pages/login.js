import Layout from "../components/layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

const sql = require("../sql");
const db = require("../db");

export default function Login({ data }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { email, password };
    const response = await axios.post("api/login", body);
    console.log(response);

    // if (response.status === 200) {
    // router.push("dashboard/user");
    // }

    {
      data.map((user) => {
        if (user.email === email && user.password === password) {
          // setMessage(`Hello ${user.name}`);
          const name = user.name;
          router.push({
            pathname: "dashboard/user",
            query: { name, email, password },
          });
        }
      });
    }
  };

  return (
    <div>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossorigin="anonymous"
        />
      </Head>

      <form className="form-signin w-100 m-auto" onSubmit={handleSubmit}>
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
