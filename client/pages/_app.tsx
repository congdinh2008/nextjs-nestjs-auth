import "bootstrap/scss/bootstrap.scss";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { ReactElement, ReactNode, useState } from "react";
import RefreshTokenHandler from "../components/refreshTokenHandler";
import "../styles/globals.scss";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const [interval, setInterval] = useState(0);

  return (
    <SessionProvider session={session} refetchInterval={interval}>
      {getLayout(<Component {...pageProps} />)}
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  );
}
