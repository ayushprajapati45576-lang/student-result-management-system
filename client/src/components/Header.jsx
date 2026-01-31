import { useState } from "react";
import { Link } from "react-router-dom";
 
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 bg-opacity-95 text-white shadow-md z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo / Title */}
        <h1 className="text-xl md:text-2xl font-bold">Student Result Portal</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 font-medium text-sm md:text-base">
          <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
          <Link to="/login" className="hover:text-yellow-300 transition-colors">
            Student Login
          </Link>
          <Link to="/admin-login" className="hover:text-yellow-300 transition-colors">
            Admin Login
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 bg-opacity-95 px-4 pb-4 space-y-2">
          <Link
            to="/"
            className="block hover:text-yellow-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/student-login"
            className="block hover:text-yellow-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Student Login
          </Link>
          <Link
            to="/admin-login"
            className="block hover:text-yellow-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Admin Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;