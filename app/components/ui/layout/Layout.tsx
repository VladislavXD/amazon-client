import React, { FC, PropsWithChildren } from "react";
import Nav from "./Navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
   <>
     <div>
      <Nav />

      <div className="relative ">
      <Sidebar />

      </div>
        <main className=" sm:ml-80 ml-24 sm:mr-3 mr-2 pt-[64px] transition-all ease-in-out">{children}</main>
    </div>  
   </>
  );
};

export default Layout;
