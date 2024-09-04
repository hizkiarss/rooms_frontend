import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";


export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }}
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                try {
                    const response = await axios.post(
                        `http://localhost:8080/graphql`,
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
                    console.log("Login response", data);
                    console.log("Login success", data);
                    console.log(response)

                    if (data.errors) {
                        // const errorMessage = data.errors[0]?.message || "Invalid email or password";
                        // // if (data.errors[0]?.extensions?.classification === "UNAUTHORIZED") {
                        // //     throw new Error("Unauthorized: Invalid email or password");
                        // // }
                        // throw new Error(errorMessage);
                        const errorCode = data.errors[0]?.extensions?.classification;
                        const errorMessage = data.errors[0]?.message || "An unknown error occurred";
                        if (errorCode === "UNAUTHORIZED") {
                            throw new Error("Unauthorized: Invalid email or password");
                        }
                        throw new Error(errorMessage);
                    }

                    const { token, role } = data.data.login;

                    if (token) {
                        return {
                            id: credentials.email as string, // You might need to adjust this based on your data
                            email: credentials.email as string,
                            roles: [role],
                            token: token,
                        };
                    } else {
                        throw new Error("Invalid response from server");
                    }
                } catch (error) {
                    console.error("Login error:", error);
                    throw new Error(
                        error instanceof Error
                            ? error.message
                            : "An unexpected error occurred"
                    );
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user,account }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.roles = user.roles;
                token.accessToken = user.token;
            }
            if (account?.provider === "google") {
                console.log("bisa ges")
                    try {
                    const response = await axios.post(
                        'http://localhost:8080/graphql',
                        {
                            query:
                            `mutation GoogleLogin($idToken: String!) {
                            googleLogin(idToken: $idToken) {
                                token
                                role
                            }
                        }`,
                        variables:{
                                idToken: account.id_token
                        },
                            headers: { "Content-Type": "application/json" },

                        }
                    );
                        const { data } = response;
                        console.log("Login success", data);

                        if (data.errors) {
                            const errorMessage = data.errors[0]?.message || "Error during Google authentication";
                            throw new Error(errorMessage);
                            // throw new Error(
                            //     data.errors[0]?.message || "Invalid email or password"
                            // );
                        }

                        const { token, role } = data.data.googleLogin;

                        if (token) {
                            return {
                                id: token.email as string, // You might need to adjust this based on your data
                                email: token.email,
                                roles: [role],
                                token: token,
                            };
                        } else {
                            throw new Error("Invalid response from server");
                        }
                } catch (error) {
                    console.error("Failed to authenticate with backend:", error);
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
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 1, // 1 hour
    },
    secret: process.env.NEXTAUTH_SECRET,
});
