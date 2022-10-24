import { getSession } from "next-auth/react";
import Head from "next/head";
import { ReactElement } from "react";
import Layout from "../components/layout";
import useAuth from "../hooks/useAuth";
import styles from "../styles/Home.module.scss";
import axios from "axios";

const Home = ({ todos }: { todos: any }) => {
  const isAuthenticated = useAuth(true);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <h1 className={styles.title}>NextJS JWT Authentication with NestJS BE</h1>
      <h2>Is Authenticated: {isAuthenticated ? "Yes" : "No"}</h2>
      <ol>
        {todos.map((todo: any) => {
          return <li key={todo._id}>{todo.name}</li>;
        })}
      </ol>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const todos = await axios.get("http://localhost:1990/todos", {
    headers: { Authorization: `Bearer ${session?.accessToken}` }
  });

  return {
    props: {
      todos: todos.data,
    },
  };
}

export default Home;
