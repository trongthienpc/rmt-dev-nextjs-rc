import React from "react";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return <div className="sidebar">{children}</div>;
};

export default Sidebar;

export function SidebarTop({ children }: { children: React.ReactNode }) {
  return <div className="sidebar__top">{children}</div>;
}