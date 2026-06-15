const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* 1. About */}
        <div>
          <h3 className="text-lg font-bold mb-3">ABOUT AP COACHING CLASSES</h3>
          <p className="text-gray-400 text-sm">
            At Anil Sir’s AP Coaching Classes, we are committed to delivering quality
            mathematics education through structured learning, concept clarity,
            and student-focused guidance. Our Student Result System enables
            students to easily access academic results, download marksheets,
            and track their performance efficiently.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-yellow-300">Home</a></li>
            <li><a href="/login" className="hover:text-yellow-300">Student Login</a></li>
            <li><a href="/admin-login" className="hover:text-yellow-300">Admin Login</a></li>
            <li><a href="/contact" className="hover:text-yellow-300">Contact Us</a></li>
          </ul>
        </div>

        {/* 3. Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>📍 Gwalior, Madhya Pradesh</li>
            <li>📞 +91 9294862917</li>
            <li>✉️ ayushprajapati45576@gmail.com </li>
          </ul>
        </div>

        {/* 4. Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500">🔵 Facebook</a>
            <a href="#" className="hover:text-cyan-400">🐦 Twitter</a>
            <a href="#" className="hover:text-pink-500">📸 Instagram</a>
            <a href="#" className="hover:text-red-600">🎥 YouTube</a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-6 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} AP COACHING CLASSES | Student Result System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;