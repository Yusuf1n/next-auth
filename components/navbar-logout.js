import Head from "next/head";
import Link from "next/link";
import axios from "axios";

export default function NavbarLogout({ form }) {
  const handleLogOut = async () => {
    const user = await axios.get("api/logout");

    console.log(user);
  };

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossorigin="anonymous"
        />
      </Head>

      <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
          <Link href="/">
            <a class="navbar-brand">Home</a>
          </Link>

          <div>
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item">
                <Link href="/logout">
                  <a class="nav-link active">Logout</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="form-signin w-100 m-auto">
        <p>{form}</p>
      </main>
    </>
  );
}
