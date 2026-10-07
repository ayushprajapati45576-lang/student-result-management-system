import { motion } from "framer-motion";
import { Megaphone, Calendar, FileText, Activity, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Campus"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
        
        <div className="relative px-6 py-24 md:py-32 max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            Student Result Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8"
          >
            Access your academic results, timetables, and campus notifications instantly in one secure portal.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/login" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-indigo-500/30">
              Student Login <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Marquee Banner */}
      <div className="bg-indigo-600 text-white shadow-md relative z-10 flex">
        <div className="bg-rose-600 px-6 py-3 font-bold flex items-center gap-2 z-20 shadow-xl shrink-0 uppercase tracking-wide text-sm">
          <Megaphone className="w-4 h-4 animate-pulse" /> Updates
        </div>
        <div className="flex-1 overflow-hidden py-3 bg-indigo-600/90 backdrop-blur-sm relative">
          <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] gap-12 px-6">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/> Class 10 & 12 Results Published</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"/> Exam Form Submission Till 20 Feb 2026</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"/> Revaluation Open for Classes 8 to 12</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse"/> Practical Exam Schedule Updated</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Notice Board */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2"
        >
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><FileText className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-slate-800">Notice Board</h2>
          </div>
          
          <div className="grid gap-4">
            {[
              { title: "Classes 8–12 Results Declared", date: "15 Jan 2026", color: "border-emerald-500", icon: <Activity className="w-5 h-5 text-emerald-500"/> },
              { title: "Annual Exam Timetable Released", date: "10 Jan 2026", color: "border-sky-500", icon: <Calendar className="w-5 h-5 text-sky-500"/> },
              { title: "Revaluation Form Last Date Extended", date: "08 Jan 2026", color: "border-rose-500", icon: <FileText className="w-5 h-5 text-rose-500"/> },
            ].map((notice, idx) => (
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.01, translateX: 5 }}
                key={idx} 
                className={`bg-white p-5 rounded-2xl shadow-sm border-l-4 ${notice.color} flex items-center justify-between group cursor-pointer transition-all hover:shadow-md`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">{notice.icon}</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{notice.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{notice.date}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Student Corner */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
            
            <h2 className="text-2xl font-bold mb-6 relative z-10">🎓 Student Corner</h2>
            
            <ul className="space-y-4 relative z-10">
              {[
                "Check Class Result",
                "Download Marksheet",
                "View Subject-wise Marks",
                "Apply for Revaluation"
              ].map((item, idx) => (
                <motion.li 
                  whileHover={{ x: 5 }}
                  key={idx} 
                  className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/5 cursor-pointer hover:bg-white/20 transition-all"
                >
                  <div className="w-2 h-2 rounded-full bg-white/80" />
                  <span className="font-medium text-white/90">{item}</span>
                </motion.li>
              ))}
            </ul>

            <Link to="/login" className="mt-8 w-full block text-center bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10">
              Go to Portal
            </Link>
          </div>
        </motion.div>

      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(10%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-flex;
          min-width: 200%;
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;