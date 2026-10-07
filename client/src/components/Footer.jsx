import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* 1. About */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-xl">RP</span>
            </div>
            <h3 className="text-xl font-bold text-white">Result portal </h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Delivering quality mathematics education through structured learning, concept clarity, and student-focused guidance. Access your academic results effortlessly.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 relative inline-block">
            Quick Links
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-indigo-500 rounded-full"></span>
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>Home</Link></li>
            <li><Link to="/login" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>Student Login</Link></li>
            <li><Link to="/admin-login" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>Admin Login</Link></li>
          </ul>
        </div>

        {/* 3. Contact Info */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 relative inline-block">
            Contact Info
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-indigo-500 rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
              <span>Gwalior, Madhya Pradesh, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
              <span>+91 9294862917</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
              <a href="mailto:ayushprajapati45576@gmail.com" className="hover:text-white transition-colors">ayushprajapati45576@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* 4. Social Media */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 relative inline-block">
            Follow Us
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-indigo-500 rounded-full"></span>
          </h3>
          <p className="text-sm text-slate-400 mb-4">Stay updated with our latest announcements and educational content.</p>
          <div className="flex space-x-3">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Result Portal. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;