import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLogOut = async () => {
    const user = await axios.get("api/logout");

    console.log(user);
    router.push("login");
  };

  return (
    <div>
      <h4>Are you sure you would like to logout?</h4>

      <button onClick={() => handleLogOut()}>Yes</button>
      <button onClick={() => router.back()}>No, take me back!</button>
    </div>
  );
}
