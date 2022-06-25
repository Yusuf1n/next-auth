import { useRouter } from "next/router";

export default function User() {
  const router = useRouter();

  const {
    query: { name, email, password },
  } = router;

  const props = { name, email, password };

  return (
    <div>
      <h1>Sensitive Data</h1>
      <p>Welcome {props.name}</p>
    </div>
  );
}
