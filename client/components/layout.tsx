import Footer from "./footer";
import Header from "./header";
import styles from "../styles/Home.module.scss";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
