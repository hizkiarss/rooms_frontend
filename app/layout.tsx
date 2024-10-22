import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "rooms",
  description: "Find your happy space in our Rooms!",

  icons: {
    icon: [
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
      </ReactQueryProvider>
    </html>
  );
}
