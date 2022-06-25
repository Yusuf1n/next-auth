import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import NavbarLogout from "../components/navbar-logout";
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
      <NavbarLogout />

      <button onClick={() => handleGetUser()}>User</button>
      <button onClick={() => handleLogOut()}>Log Out</button>
    </div>
  );
}
