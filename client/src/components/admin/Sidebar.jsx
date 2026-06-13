import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronsLeft, X } from "lucide-react";

const Sidebar = ({ open, setOpen }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [classOpen, setClassOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false); // ✅ NEW

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(true);
      } else {
        setOpen(false);
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  const closeSidebar = () => {
    if (window.innerWidth < 768) setOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          bg-gradient-to-b from-[#0f172a] to-[#020617] text-white
          transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} 
          fixed top-0 left-0 z-50 h-screen
          md:relative md:translate-x-0
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          {!collapsed && <span className="font-bold">SRMS | Admin</span>}

          <div className="flex items-center space-x-2">
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

            {window.innerWidth < 768 && (
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          <NavLink
            onClick={closeSidebar}
            to="/admin/dashboard"
            className="menu"
          >
            📊 {!collapsed && "Dashboard"}
          </NavLink>

          {/* Classes */}
          <button
            onClick={() => setClassOpen(!classOpen)}
            className="menu w-full flex justify-between items-center"
          >
            <span>🏫 {!collapsed && "Student Classes"}</span>
            {!collapsed && (
              <ChevronRight
                className={`transition ${
                  classOpen ? "rotate-90" : ""
                }`}
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

          {/* Subjects */}
          <button
            onClick={() => setSubjectOpen(!subjectOpen)}
            className="menu w-full flex justify-between items-center"
          >
            <span>📚 {!collapsed && "Subjects"}</span>
            {!collapsed && (
              <ChevronRight
                className={`transition ${
                  subjectOpen ? "rotate-90" : ""
                }`}
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

          {/* Students */}
          <button
            onClick={() => setStudentOpen(!studentOpen)}
            className="menu w-full flex justify-between items-center"
          >
            <span>👨‍🎓 {!collapsed && "Students"}</span>
            {!collapsed && (
              <ChevronRight
                className={`transition ${
                  studentOpen ? "rotate-90" : ""
                }`}
              />
            )}
          </button>

          {studentOpen && !collapsed && (
            <div className="ml-6 space-y-1">
              <NavLink
                onClick={closeSidebar}
                to="/admin/students/add"
                className="submenu"
              >
                ➕ Add Student
              </NavLink>
              <NavLink
                onClick={closeSidebar}
                to="/admin/students/manage"
                className="submenu"
              >
                📋 Manage Students
              </NavLink>
            </div>
          )}

          {/* ✅ Results Dropdown (NEW) */}
          <button
            onClick={() => setResultOpen(!resultOpen)}
            className="menu w-full flex justify-between items-center"
          >
            <span>📝 {!collapsed && "Results"}</span>
            {!collapsed && (
              <ChevronRight
                className={`transition ${
                  resultOpen ? "rotate-90" : ""
                }`}
              />
            )}
          </button>

          {resultOpen && !collapsed && (
            <div className="ml-6 space-y-1">
              <NavLink
                onClick={closeSidebar}
                to="/admin/results/add"
                className="submenu"
              >
                ➕ Add Result
              </NavLink>
              <NavLink
                onClick={closeSidebar}
                to="/admin/results/manage"
                className="submenu"
              >
                📋 Manage Results
              </NavLink>
            </div>
          )}

          {/* Notices */}
          <NavLink
            onClick={closeSidebar}
            to="/admin/notices"
            className="menu"
          >
            📢 {!collapsed && "Notices"}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
