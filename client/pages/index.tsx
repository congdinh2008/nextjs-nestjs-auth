import type { NextPage } from "next";
import Head from "next/head";
import { ReactElement } from "react";
import Layout from "../components/layout";
import styles from "../styles/Home.module.scss";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <h1 className={styles.title}>NextJS JWT Authentication with NestJS BE</h1>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
