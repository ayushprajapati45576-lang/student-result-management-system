const Home = () => {
  return (
    <div className="px-4 md:px-8 py-6">  
 
      {/* ===== Banner ===== */}
      <img
        src="https://www.softwaresuggest.com/blog/wp-content/uploads/2020/04/12-Benefits-of-Student-Database-Management-System.jpg"
        className="w-full h-48 md:h-[430px] object-cover rounded-lg shadow"
        alt="College Banner"
      />

      {/* ===== Running Notice Bar ===== */}
      <div className="mt-4 flex items-center bg-gray-900 text-white rounded-md overflow-hidden">
        
        {/* Left Label */}
        <div className="bg-red-600 px-3 md:px-6 py-2 md:py-3 font-bold text-sm md:text-lg">
          NOTICE
        </div>

        {/* Right Marquee */}
        <div className="flex-1 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
            <span className="mx-4 md:mx-8 text-sm md:text-base">
              📢 Semester 5 Result Published
            </span>
            <span className="mx-4 md:mx-8 text-sm md:text-base">
              📝 Exam Form Submission Till 20 Feb 2026
            </span>
            <span className="mx-4 md:mx-8 text-sm md:text-base">
              ⚠️ Revaluation Open for BTECH & BCA
            </span>
            <span className="mx-4 md:mx-8 text-sm md:text-base">
              🎓 Final Year Viva Schedule Updated
            </span>
          </div>
        </div>
      </div>

      {/* ===== Notice Board Section ===== */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Notice Board */}
        <div className="md:col-span-2 bg-white shadow rounded-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold border-b pb-2 mb-4">
            📌 Notice Board
          </h2>

          <ul className="space-y-3 md:space-y-4 text-gray-700">
            <li className="border-l-4 border-blue-500 pl-2 md:pl-3">
              <p className="font-semibold text-sm md:text-base">
                Semester 1–6 Result Declared
              </p>
              <span className="text-xs md:text-sm text-gray-500">
                Date: 15 Jan 2026
              </span>
            </li>

            <li className="border-l-4 border-green-500 pl-2 md:pl-3">
              <p className="font-semibold text-sm md:text-base">
                MBA Semester 2 Exam Timetable Released
              </p>
              <span className="text-xs md:text-sm text-gray-500">
                Date: 10 Jan 2026
              </span>
            </li>

            <li className="border-l-4 border-red-500 pl-2 md:pl-3">
              <p className="font-semibold text-sm md:text-base">
                Revaluation Form Last Date Extended
              </p>
              <span className="text-xs md:text-sm text-gray-500">
                Date: 08 Jan 2026
              </span>
            </li>
          </ul>
        </div>

        {/* Student Info / Login Info */}
        <div className="bg-blue-50 border rounded-lg p-4 md:p-6">
          <h2 className="text-md md:text-lg font-bold mb-3">
            🎓 Student Corner
          </h2>

          <ul className="space-y-2 md:space-y-3 text-gray-700 text-sm md:text-base">
            <li>✔ Check Semester Result</li>
            <li>✔ Download Marksheet</li>
            <li>✔ View Subject-wise Marks</li>
            <li>✔ Apply for Revaluation</li>
          </ul>
        </div>
      </div>

      {/* ===== Marquee Animation ===== */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

    </div>
  );
};

export default Home;