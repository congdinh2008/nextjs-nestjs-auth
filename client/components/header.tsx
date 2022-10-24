import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Header() {
  const isAuthenticated = false;
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            NextJS JWT Authentication
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link active" aria-current="page">
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/About">
                  <a className="nav-link">About</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/Contact">
                  <a className="nav-link">Contact</a>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {!isAuthenticated && (
                <li className="nav-item">
                  <Link href="/auth/login">
                    <a className="nav-link">Sign In</a>
                  </Link>
                </li>
              )}

              {isAuthenticated && (
                <li className="nav-item">
                  <button className="nav-link bg-transparent border-0">
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
