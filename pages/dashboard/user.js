import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NavbarLogout from "../../components/navbar-logout";

export default function User() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // const {
  //   query: { name, email, password },
  // } = router;

  // const props = { name, email, password };
  // console.log(props);

  useEffect(() => {
    // setter
    setEmail(localStorage.getItem("email"));
    setName(localStorage.getItem("name"));
  });

  return (
    <div>
      <NavbarLogout></NavbarLogout>
      <h1>Sensitive Data</h1>
      {/* <p>Welcome {props.email}</p> */}
      <h1>{email}</h1>
      <h1>{name}</h1>
    </div>
  );
}
