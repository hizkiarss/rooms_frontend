import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { SessionProvider } from "next-auth/react";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import LoadingStateAnimation from "@/components/animations/LoadingStateAnimation";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "rooms",
  description: "Find your happy space in our Rooms!",

  //   icons: {
  //     icon: "/roomsIcon.ico",
  //   },
  icons: {
    icon: [
      //   { rel: "icon", type: "image/x-icon", url: "/iconrooms.ico" },
      { rel: "icon", type: "image/x-icon", url: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        {/*<Suspense fallback={<LoadingStateAnimation/>}>*/}
        <body>
          <div className={""}>
            <div>
              <SessionProvider>
                <Navbar />
                {children}
                <Footer />
              </SessionProvider>
            </div>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </body>
        {/*</Suspense>*/}
      </ReactQueryProvider>
    </html>
  );
}
