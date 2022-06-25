import Layout from "../components/layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    const body = { name, email, password };

    const response = await axios.post("api/register", body);
    console.log(body);
    await router.push("/login");
  };

  return (
    <Layout
      form={
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please register</h1>
          <input
            className="form-control"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      }
    />
  );
}
