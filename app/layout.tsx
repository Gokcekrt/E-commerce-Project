import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { auth0 } from "@/lib/auth0";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession(); // Session bilgisini alıyoruz ve Navbar'a prop olarak geçiyoruz

  {
    return (
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <Navbar session={session} />
          <main>{children}</main>
        </body>
      </html>
    );
  }
}
