import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";

const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          return {
            error: "Email and password are required",
          };
        }

        try {
          const response = await axios.post(
            url,
            {
              query: `
                mutation Login($email: String!, $password: String!) {
                  login(email: $email, password: $password) {
                    token
                    role
                  }
                }
              `,
              variables: {
                email: credentials.email,
                password: credentials.password,
              },
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          const { data } = response;

          if (data.errors) {
            return {
              error: data.errors[0]?.message || "Authentication failed",
            };
          }

          if (data?.data?.login?.token) {
            const { token, role } = data.data.login;
            return {
              id: credentials.email,
              email: credentials.email,
              roles: [role],
              token: token,
            };
          } else {
            return {
              error: "Invalid response structure from server",
            };
          }
        } catch (error) {
          return {
            error:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred",
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }): Promise<any> {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roles = user.roles;
        token.accessToken = user.token;
      }
      if (account?.provider === "google") {
        try {
          const response = await axios.post(
            url,
            {
              query: `
                  mutation GoogleLogin($idToken: String!) {
                    googleLogin(idToken: $idToken) {
                      token
                      role
                    }
                  }
                `,
              variables: {
                idToken: account.id_token,
              },
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          const { data } = response;

          if (data.errors) {
            return {
              ...token,
              error:
                data.errors[0]?.message || "Error during Google authentication",
            };
          }

          const { token: authToken, role } = data.data.googleLogin;

          if (authToken) {
            return {
              ...token,
              id: token.email ?? "",
              email: token.email ?? "",
              roles: [role],
              accessToken: authToken,
            };
          } else {
            return { ...token, error: "Invalid response from server" };
          }
        } catch (error) {
          return { ...token, error: "Failed to authenticate with backend" };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.roles = token.roles as string | string[];
        session.accessToken = token.accessToken as string;
        if (token.error) {
          session.error = token.error as string;
        }
      }
      return session;
    },
    async signIn({ user }) {
      if (user.error) {
        return `/login?error=${encodeURIComponent(user.error)}`;
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
