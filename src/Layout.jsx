import React from "react";
import TopNav from "./components/TopNav";
import LeftNav from "./components/LeftNav";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <div className="bg-white h-full">
        <LeftNav />
      </div>

      {/* Right Main Content */}
      <div className="flex flex-col flex-1 h-full">
        {/* Top Navigation */}
        <div className="h-[10vh] w-full">
          <TopNav />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-gray-50">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
