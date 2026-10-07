import { useLoginMutation } from "../features/auth/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { User, Lock, Mail, ArrowRight, GraduationCap } from "lucide-react";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      if (res.user.role === "student") {
        toast.success("Student login successful ✅");
        navigate("/student/result");
      }

    } catch (error) {
      toast.error("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-teal-50 to-emerald-100 px-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-teal-300/30 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/60 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl w-full max-w-md p-8 md:p-10"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-tr from-teal-500 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-teal-500/30"
          >
            <GraduationCap className="text-white w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Student Portal
          </h2>
          <p className="text-slate-500 mt-2 text-sm">Access your academic profile & results</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="student@example.com"
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? "Signing in..." : "Login"}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </motion.button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6 font-medium">
          Forgot password? <a href="#" className="text-teal-600 hover:text-teal-700 hover:underline transition-colors">Click here</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
