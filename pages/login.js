import Layout from "../components/layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const sql = require("../sql");
const db = require("../db");

export default function Login({ data }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { email, password };
    try {
      const response = await axios.post("api/auth/login", body);
      console.log(response);

      if (response.status === 200) {
        // router.push({
        //   pathname: "dashboard/user",
        //   query: { email, password },
        // });
        console.log(response.data.message);
        console.log(response.data.name);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", email);
        router.push("/dashboard/user");
      }
    } catch (ex) {
      if (ex.response.status === 401 || ex.response.status === 500) {
        setErrMsg("Invalid email or password");
      }
    }

    //   {
    //     data.map((user) => {
    //       console.log(user);
    //       const name = user.name;
    //       if (user.email === email && user.password === password) {
    //         router.push({
    //           pathname: "dashboard/user",
    //           query: { name, email, password },
    //         });
    //       }
    //     });
    //   }
  };

  return (
    <div>
      <form className="form-signin w-100 m-auto" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please login</h1>
        <h5 className="h5 mb-3 text-danger">{errMsg}</h5>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          // type="password"
          className="form-control mb-3"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">
          Login
        </button>

        <div class="container">
          <div class="row">
            <div class="col">
              <p>Don't have an account?</p>
            </div>
            <div class="col">
              <Link href="/register">
                <a>Register</a>
              </Link>
            </div>
          </div>
        </div>
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
