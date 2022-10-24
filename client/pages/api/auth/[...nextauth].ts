import axios from "axios";
import jwtDecode from "jwt-decode";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type IToken = {
  name: string;
  exp: number;
};

async function refreshAccessToken(tokenObject: any) {
  try {
    const tokenResponse = await axios.get(
      "http://localhost:1990/auth/refresh",
      {
        headers: {
          Authorization: `Bearer ${tokenObject.refreshToken}`,
        },
      }
    );

    const decoded = jwtDecode<IToken>(tokenResponse.data.accessToken);
    const accessTokenExpiry = decoded.exp;

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      accessTokenExpiry: accessTokenExpiry,
      refreshToken: tokenResponse.data.refreshToken,
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

const providers = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      username: { label: "username", type: "text", placeholder: "admin" },
      password: { label: "password", type: "password" },
    },
    authorize: async (credentials: any) => {
      try {
        const res = await axios.post("http://localhost:1990/auth/login", {
          username: credentials.username,
          password: credentials.password,
        });

        if (res.data.accessToken) {
          const decoded = jwtDecode<IToken>(res.data.accessToken);
          return {
            ...res.data,
            accessTokenExpiry: decoded.exp,
          };
        }

        return null;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  }),
];

const callbacks = {
  jwt: async ({ token, user }: { token: any; user: any }) => {
    if (user) {
      token.accessToken = user.accessToken;
      token.accessTokenExpiry = user.accessTokenExpiry;
      token.refreshToken = user.refreshToken;
      token.user = user.user;
    }

    const shouldRefreshTime = Math.round(
      token.accessTokenExpiry - Date.now() / 1000 - 60 * 10
    );

    if (shouldRefreshTime > 0) {
      return Promise.resolve(token);
    }

    token = await refreshAccessToken(token);

    return Promise.resolve(token);
  },
  session: async ({ session, token }: { session: any; token: any }) => {
    // Here we pass accessToken to the client to be used in authentication with your API
    session.accessToken = token.accessToken;
    session.accessTokenExpiry = token.accessTokenExpiry;
    session.error = token.error;

    return Promise.resolve(session);
  },
};

export const options = {
  session: {
    strategy: "jwt",
  },
  providers,
  callbacks,
  pages: {
    signIn: "/auth/login",
  },
  secret: "A6wAq+zVq04yDjTW+ryH+/0yRg5np2aGOmg+mvGHiPU=",
};

const Auth = (req: any, res: any) => NextAuth(req, res, options as any);
export default Auth;
