import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Footer() {
  return (
    <footer className="text-center p-3 bg-dark text-secondary">
      <Link href="/">
        <a target="_blank" rel="noopener noreferrer">
          Powered by Cong Dinh
        </a>
      </Link>
    </footer>
  );
}
