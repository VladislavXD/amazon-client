import React, { FC, PropsWithChildren } from "react";
import Nav from "./components/ui/layout/Navbar/Navbar";
import Sidebar from "./components/ui/layout/sidebar/Sidebar";
import Providers from "../providers/Providers";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "@/src/assets/styles/globals.scss";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amazon Clone",
  description: "E-commerce platform built with Next.js",
  keywords: "ecommerce, shopping, amazon, clone",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressContentEditableWarning className="dark">
      <body className="bg-[#000000] text-white">
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <Providers>
          <Nav />

          <div className="relative ">
            <Sidebar />
          </div>
          <main className=" sm:ml-80 ml-20 sm:mr-3 mr-2 pt-[64px] transition-all ease-in-out">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
