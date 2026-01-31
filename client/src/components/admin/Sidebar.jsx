import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, ChevronsLeft } from "lucide-react";

const Sidebar = ({ open, setOpen, collapsed, setCollapsed }) => {
  const [classOpen, setClassOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);

  const closeSidebar = () => {
    if (window.innerWidth < 768) setOpen(false);
  };

  return (
    <aside
      className={`
        fixed md:static top-0 left-0 z-50
        h-screen bg-gradient-to-b from-[#0f172a] to-[#020617]
        text-white transition-all duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        {!collapsed && <span className="font-bold">SRMS | Admin</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:block"
        >
          <ChevronsLeft
            className={`transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <nav className="p-3 space-y-1">

        <NavLink onClick={closeSidebar} to="/admin/dashboard" className="menu">
          📊 {!collapsed && "Dashboard"}
        </NavLink>

        {/* ===== Student Classes Dropdown ===== */}
        <button
          onClick={() => setClassOpen(!classOpen)}
          className="menu w-full flex justify-between items-center"
        >
          <span>🏫 {!collapsed && "Student Classes"}</span>
          {!collapsed && (
            <ChevronRight
              className={`transition ${classOpen ? "rotate-90" : ""}`}
            />
          )}
        </button>

        {classOpen && !collapsed && (
          <div className="ml-6 space-y-1">
            <NavLink
              onClick={closeSidebar}
              to="/admin/classes/add"
              className="submenu"
            >
              ➕ Create Class
            </NavLink>
            <NavLink
              onClick={closeSidebar}
              to="/admin/classes/manage"
              className="submenu"
            >
              📋 Manage Classes
            </NavLink>
          </div>
        )}

        {/* ===== Subject Dropdown ===== */}
        <button
          onClick={() => setSubjectOpen(!subjectOpen)}
          className="menu w-full flex justify-between items-center"
        >
          <span>📚 {!collapsed && "Subjects"}</span>
          {!collapsed && (
            <ChevronRight
              className={`transition ${subjectOpen ? "rotate-90" : ""}`}
            />
          )}
        </button>

        {subjectOpen && !collapsed && (
          <div className="ml-6 space-y-1">
            <NavLink
              onClick={closeSidebar}
              to="/admin/subjects/create"
              className="submenu"
            >
              ➕ Create Subject
            </NavLink>
            <NavLink
              onClick={closeSidebar}
              to="/admin/subjects/manage"
              className="submenu"
            >
              📋 Manage Subjects
            </NavLink>
          </div>
        )}

        <NavLink onClick={closeSidebar} to="/admin/students" className="menu">
          👨‍🎓 {!collapsed && "Students"}
        </NavLink>

        <NavLink onClick={closeSidebar} to="/admin/results" className="menu">
          📝 {!collapsed && "Results"}
        </NavLink>

        <NavLink onClick={closeSidebar} to="/admin/notices" className="menu">
          📢 {!collapsed && "Notices"}
        </NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;