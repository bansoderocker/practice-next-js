"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavLink from "next/link";
import "./css/common.css";
// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
const router = useRouter();
const [user, setUser] = useState(null);

interface LayoutProps {
  children: ReactNode;
}

const navLinks = [
  { name: "Bill", href: "/Expense" },
  { name: "Party", href: "/Party" },
  { name: "Account", href: "/Account" },
  { name: "Truck", href: "/Truck" },
  { name: "Expense", href: "/ExpenseType" },
  { name: "About", href: "/About" },
  { name: "Contact", href: "/Contact" },
];

const inter = Inter({ subsets: ["latin"] });
const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <html lang="en">
      <head>
        {/* <title>{metadata.title ?? ""}</title> */}
        <meta
          name={metadata.description ?? ""}
          content={metadata.description ?? ""}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <h1>My Transport Website</h1>
        <div id="headerMenu" className="topnav">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={link.href == pathName ? "active link" : "link"}
            >
              {link.name}
            </Link>
          ))}
        </div>
        {children}
      </body>
    </html>
  );
}
//export { metadata };
