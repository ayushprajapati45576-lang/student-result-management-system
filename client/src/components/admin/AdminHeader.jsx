import { Menu, LogOut, Bell, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation, useGetProfileQuery } from "../../features/auth/authApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AdminHeader = ({ setOpen }) => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { data: admin, isLoading } = useGetProfileQuery();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("token");
      toast.success("Successfully logged out ✨");
      navigate("/admin-login", { replace: true });
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between bg-white/80 backdrop-blur-xl px-6 py-4 shadow-sm border-b border-slate-200 sticky top-0 z-40"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setOpen(true)} 
          className="md:hidden p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-bold text-indigo-700 tracking-wide uppercase">Admin Panel</span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="text-right hidden sm:block">
          <p className="text-xs text-slate-500 font-medium">Welcome back,</p>
          <h2 className="font-bold text-slate-800 text-sm">
            {isLoading ? "Loading..." : admin?.user?.name}
          </h2>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
          {admin?.user?.name ? admin.user.name.charAt(0).toUpperCase() : "A"}
        </div>

        <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white px-4 py-2 rounded-xl transition-all font-semibold text-sm shadow-sm hover:shadow-rose-500/25"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default AdminHeader;