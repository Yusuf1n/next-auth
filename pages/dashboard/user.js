import { useRouter } from "next/router";
import NavbarLogout from "../../components/navbar-logout";

export default function User() {
  const router = useRouter();

  const {
    query: { name, email, password },
  } = router;

  const props = { name, email, password };

  return (
    <div>
      <NavbarLogout></NavbarLogout>
      <h1>Sensitive Data</h1>
      <p>Welcome {props.name}</p>
    </div>
  );
}
