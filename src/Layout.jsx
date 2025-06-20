import React from "react";
import TopNav from "./components/TopNav";
import LeftNav from "./components/LeftNav";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-[10vh]">
        <TopNav />
      </div>

      <div className="flex flex-1 h-[90vh] overflow-hidden">
        <div className="h-full">
          <LeftNav />
        </div>

        <div className="flex-1 overflow-auto bg-white p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
