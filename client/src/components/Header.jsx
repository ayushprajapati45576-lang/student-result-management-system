import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, ShieldCheck, Home, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { authApi, useGetProfileQuery, useLogoutMutation } from "../features/auth/authApi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasToken, setHasToken] = useState(() => Boolean(localStorage.getItem("token")));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { data: profile } = useGetProfileQuery(undefined, { skip: !hasToken });
  const isLoggedIn = hasToken && Boolean(profile?.user);

  useEffect(() => {
    const syncTokenState = () => {
      setHasToken(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("storage", syncTokenState);
    syncTokenState();

    return () => window.removeEventListener("storage", syncTokenState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("token");
      dispatch(authApi.util.resetApiState());
      setIsOpen(false);
      toast.success("Successfully logged out ✨");
      navigate("/", { replace: true });
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Student Login", path: "/login", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "Admin Login", path: "/admin-login", icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo / Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <h1 className={`text-xl font-extrabold tracking-tight transition-colors ${scrolled ? "text-slate-800" : "text-slate-800 md:text-white"}`}>
             <span className="text-indigo-600">Result Portal</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="hidden md:flex items-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white px-5 py-2 rounded-full transition-all font-semibold text-sm disabled:opacity-60"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        ) : (
          <nav className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-slate-200/50 rounded-full px-2 py-1.5 shadow-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${isActive ? "text-white" : "text-slate-600 hover:text-indigo-600"}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-indigo-600 rounded-full shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {link.icon} {link.name}
                  </span>
                </Link>
              )
            })}
          </nav>
        )}

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-xl font-semibold text-sm disabled:opacity-60"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${scrolled ? "bg-slate-100 text-slate-800" : "bg-white/20 text-slate-800 backdrop-blur-md"}`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && !isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-2xl border-t border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-2 flex flex-col">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-4 rounded-2xl font-semibold transition-colors ${isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? "bg-indigo-100" : "bg-slate-100"}`}>
                      {link.icon}
                    </div>
                    {link.name}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
