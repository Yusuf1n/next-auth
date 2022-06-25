import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import axios from "axios";

export default function Home() {
  const handleGetUser = async () => {
    const user = await axios.get("api/user");

    console.log(user);
  };

  const handleLogOut = async () => {
    const user = await axios.get("api/logout");

    console.log(user);
  };

  return (
    <div>
      <Layout form="Home" />

      <button onClick={() => handleGetUser()}>User</button>
      <button onClick={() => handleLogOut()}>Log Out</button>
    </div>
  );
}
