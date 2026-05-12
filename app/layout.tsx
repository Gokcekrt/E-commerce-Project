import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { auth0 } from "@/lib/auth0";
import Navbar from "@/components/Navbar";
import { getAdmin } from "@/lib/authz";
import { CartProvider } from "@/context/CartContext";

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
  const adminUser = await getAdmin();
  const isAdmin = !!adminUser;

  {
    return (
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col">
          <CartProvider>
            <Navbar session={session} isAdmin={isAdmin} />
            <main>{children}</main>
          </CartProvider>
        </body>
      </html>
    );
  }
}
