import type { Metadata } from "next";

import "./globals.css";

import {
  Inter,
} from "next/font/google";

import {
  Toaster,
} from "react-hot-toast";

import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Peer Recognition App",

  description:
    "Hackathon Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >

      <body
        className={
          inter.className
        }
      >

        <ThemeProvider>

          {children}

          <Toaster
            position="top-right"

            toastOptions={{
              duration: 3000,

              style: {
                borderRadius:
                  "16px",

                background:
                  "#111827",

                color: "#fff",

                padding:
                  "16px",
              },
            }}
          />

        </ThemeProvider>

      </body>

    </html>
  );
}