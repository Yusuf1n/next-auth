import Layout from "../components/layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name, email, password };

    try {
      const response = await axios.post("api/register", body);
      console.log(response.data);

      if (response.status === 200) {
        await router.push("/login");
      }
    } catch (ex) {
      if (ex.response.status === 401) {
        setErrMsg(`An account with the email ${email} already exists`);
      }
    }
  };

  return (
    <div>
      <form className="form-signin w-100 m-auto" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please register</h1>
        <h5 className="h5 mb-3 text-danger">{errMsg}</h5>
        <input
          className="form-control mb-2"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">
          Submit
        </button>

        <div class="container">
          <div class="row">
            <div class="col">
              <p>Already have an account?</p>
            </div>
            <div class="col">
              <Link href="/login">
                <a>Login</a>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
