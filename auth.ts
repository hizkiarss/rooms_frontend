KurniawanRizki
kurniawanrizki
Online

KurniawanRizki
 started a call that lasted 16 minutes.
 — 09/18/2024 4:50 PM
hizkia
 started a call that lasted an hour.
 — 09/19/2024 3:17 PM
You missed a call from 
hizkia
 that lasted a few seconds.
 — 09/20/2024 4:50 PM
KurniawanRizki
 started a call that lasted an hour.
 — 09/20/2024 4:51 PM
KurniawanRizki — 09/20/2024 5:42 PM
https://excalidraw.com/#json=L5-dm9FI0GvgeubLWOoA7,A0pICz68X8tYATKs-MfqWA
Excalidraw
Excalidraw — Collaborative whiteboarding made easy
Excalidraw is a virtual collaborative whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel to them.
Excalidraw — Collaborative whiteboarding made easy
hizkia — 09/20/2024 6:04 PM
keknya lu salah ngirim gambar dah
KurniawanRizki — 09/20/2024 10:39 PM
lah iya ya wkwk
hizkia — 09/20/2024 10:39 PM
gpp bang
hizkia
 started a call that lasted an hour.
 — 09/20/2024 10:39 PM
You missed a call from 
hizkia
 that lasted a few seconds.
 — 09/23/2024 4:41 PM
KurniawanRizki
 started a call that lasted 20 minutes.
 — 09/23/2024 4:43 PM
KurniawanRizki
 started a call that lasted 30 minutes.
 — 09/23/2024 5:21 PM
hizkia
 started a call that lasted 14 minutes.
 — 09/26/2024 9:25 PM
hizkia
 started a call that lasted 38 minutes.
 — 09/26/2024 10:46 PM
KurniawanRizki — 09/26/2024 10:47 PM
ntar dulu
hizkia — 09/26/2024 11:23 PM
walah discordnya kocak
KurniawanRizki — 09/26/2024 11:24 PM
coba telpon lagi
hizkia
 started a call that lasted 12 minutes.
 — 09/26/2024 11:25 PM
hizkia
 started a call that lasted an hour.
 — 09/30/2024 2:31 AM
hizkia
 started a call that lasted 2 hours.
 — 09/30/2024 2:13 PM
hizkia
 started a call that lasted 2 hours.
 — 10/04/2024 12:16 AM
hizkia
 started a call that lasted 2 hours.
 — 10/04/2024 4:59 PM
KurniawanRizki — 10/04/2024 5:26 PM
https://rooms-backend-dev-262136089465.us-central1.run.app/
KurniawanRizki — 10/04/2024 6:24 PM
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
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1, // 1 hour
  },
hizkia
 started a call that lasted a few seconds.
 — 10/04/2024 9:59 PM
hizkia
 started a call that lasted 2 hours.
 — 10/05/2024 3:11 AM
hizkia — 10/05/2024 3:39 AM
@Query("SELECT r FROM Rooms r " +
            "WHERE r.id NOT IN (" +
            "    SELECT DISTINCT b.room.id FROM Booking b " +
            "    WHERE b.room.properties.id = :propertyId " +
            "    AND (:checkInDate < b.endDate AND :checkOutDate > b.startDate)" +
            ") " +
            "AND r.isAvailable = true " +
            "AND r.properties.id = :propertyId " +
            "ORDER BY r.price ASC ")
    List<Rooms> findAvailableRooms(
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("propertyId") Long propertyId);
KurniawanRizki — 10/05/2024 4:04 AM
query GetAvailableRooms {
    getAvailableRooms(
        checkinDate: "2024-10-10"
        checkOutDate: "2024-10-14"
        propertyId: "1"
    ) {
        id
        name
        description
        capacity
        isAvailable
        roomNumber
        price
        includeBreakfast
        roomArea
    }
}
KurniawanRizki
 started a call that lasted a few seconds.
 — 10/05/2024 12:31 PM
hizkia
 started a call that lasted an hour.
 — 10/05/2024 12:32 PM
hizkia
 started a call that lasted an hour.
 — 10/05/2024 1:56 PM
You missed a call from 
hizkia
 that lasted a few seconds.
 — 10/05/2024 3:07 PM
KurniawanRizki
 started a call that lasted a few seconds.
 — 10/05/2024 3:08 PM
KurniawanRizki
 started a call that lasted a few seconds.
 — 10/05/2024 3:10 PM
hizkia
 started a call that lasted an hour.
 — 10/05/2024 3:10 PM
hizkia — 10/05/2024 3:14 PM
https://rooms-git-property-hizkia-sihombings-projects.vercel.app/
hizkia
 started a call that lasted 21 minutes.
 — 10/05/2024 11:19 PM
KurniawanRizki — 10/05/2024 11:22 PM
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import { useSession } from "next-auth/react";
Expand
message.txt
6 KB
hizkia
 started a call that lasted 2 hours.
 — 10/05/2024 11:41 PM
hizkia
 started a call that lasted an hour.
 — 10/06/2024 9:21 PM
hizkia — 10/06/2024 9:39 PM
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
Expand
message.txt
7 KB
import { gql } from './gql-tag';

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
Expand
message.txt
11 KB
KurniawanRizki — 10/06/2024 9:54 PM
"use client";
import EmptyDataAnimation from "@/components/animations/EmptyDataAnimation";
import ErrorAnimation from "@/components/animations/ErrorAnimation";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import PaginationControl from "@/components/PaginationControl";
import SortAndFilter from "@/components/SortAndFIlter";
Expand
message.txt
7 KB
KurniawanRizki — 10/06/2024 10:17 PM
const handlePageChange = (page: number) => {
    // Sesuaikan page yang dikirim ke backend (backend mulai dari 0)
    if (transactionPage && page > 0 && page <= transactionPage.totalPages) {
      setCurrentPage(page - 1); // Mengurangi 1 agar cocok dengan backend
    }
  };
hizkia
 started a call that lasted 18 minutes.
 — 10/08/2024 12:58 AM
hizkia
 started a call that lasted 8 minutes.
 — 10/08/2024 8:31 PM
hizkia
 started a call that lasted 19 minutes.
 — Yesterday at 9:56 PM
KurniawanRizki — Yesterday at 10:01 PM
https://apps.expediapartnercentral.com/en_US/list?utm_medium=referral&utm_source=wwwexpediacom-en_US&utm_campaign=Brand.DTI&utm_contentewd=pwa-header-btn&siteId=1&tpid=1&eapid=0&langId=1033&utm_term=Brand.DTI&lasttouchMktgcode=Brand.DTI#ulx-hero
hizkia
 started a call that lasted 26 minutes.
 — Yesterday at 11:47 PM
hizkia
 started a call.
 — Today at 3:50 PM
hizkia — Today at 4:39 PM
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import {Awaitable} from "@auth/core/types";
Expand
message.txt
7 KB
﻿
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import {Awaitable} from "@auth/core/types";

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
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials):Promise<any> {
                if (!credentials?.email || !credentials?.password) {
                    return {
                        error: "Email and password are required",
                    };
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

                    console.log("Full response:", JSON.stringify(response.data, null, 2));

                    const { data } = response;

                    if (data.errors) {
                        console.log("GraphQL Error:", data.errors);
                        return {
                            error: data.errors[0]?.message || "Authentication failed",
                        };
                    }

                    if (data?.data?.login?.token) {
                        console.log("Successful login. Token:", data.data.login.token, "Role:", data.data.login.role);
                        const { token, role } = data.data.login;
                        return {
                            id: credentials.email,
                            email: credentials.email,
                            roles: [role],
                            token: token,
                        };
                    } else {
                        console.error("Unexpected response structure:", data);
                        return {
                            error: "Invalid response structure from server",
                        };
                    }
                } catch (error) {
                    console.error("Login error:", error);
                    return {
                        error: error instanceof Error ? error.message : "An unexpected error occurred",
                    };
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }): Promise<any>{
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.roles = user.roles;
                token.accessToken = user.token;
            }
            if (account?.provider === "google") {
                console.log("Google authentication");
                try {
                    const response = await axios.post(
                        'http://localhost:8080/graphql',
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
                                idToken: account.id_token
                            },
                        },
                        {
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                    const { data } = response;
                    console.log("Google login response:", data);

                    if (data.errors) {
                        console.error("Google login error:", data.errors);
                        return { ...token, error: data.errors[0]?.message || "Error during Google authentication" };
                    }

                    const { token: authToken, role } = data.data.googleLogin;

                    if (authToken) {
                        return {
                            id: token.email,
                            email: token.email,
                            roles: [role],
                            token: authToken,
                        };
                    } else {
                        console.error("Invalid response from server during Google login");
                        return { ...token, error: "Invalid response from server" };
                    }
                } catch (error) {
                    console.error("Failed to authenticate with backend:", error);
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
        }
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 1, // 1 hour
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development'
});
message.txt
7 KB