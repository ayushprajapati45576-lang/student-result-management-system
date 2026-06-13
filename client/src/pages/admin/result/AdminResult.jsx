import { useState, useMemo } from "react";
import { useGetResultsQuery } from "../../../features/result/resultApi";

const AdminResultList = () => {

  const { data: results = [], isLoading } = useGetResultsQuery();

  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);

  // ✅ Group By Student + Year
  const groupedResults = useMemo(() => {
    const map = {};

    results.forEach((res) => {
      const key = `${res.student?._id}_${res.year}`;

      if (!map[key]) {
        map[key] = {
          student: res.student,
          year: res.year,
          semester: res.semester,
          results: []
        };
      }

      map[key].results.push(res);
    });

    return Object.values(map);
  }, [results]);

  // ✅ Search + Filter
  const filteredData = groupedResults.filter((group) => {
    const name = group.student?.user?.name?.toLowerCase();
    const roll = group.student?.rollNo?.toString();

    const matchSearch =
      name?.includes(search.toLowerCase()) ||
      roll?.includes(search);

    const matchYear =
      filterYear === "" || group.year.toString() === filterYear;

    return matchSearch && matchYear;
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl">

      <h2 className="text-2xl font-bold mb-6 text-center">
        🎓 Student Result Management
      </h2>

      {/* 🔍 Search + Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Name or Roll"
          className="border p-2 rounded-lg w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="number"
          placeholder="Filter Year"
          className="border p-2 rounded-lg w-40"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        />
      </div>

      {/* 📋 Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Student</th>
              <th className="border p-2">Roll</th>
              <th className="border p-2">Semester</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((group, index) => (
              <tr key={index}>
                <td className="border p-2">
                  {group.student?.user?.name}
                </td>
                <td className="border p-2">
                  {group.student?.rollNo}
                </td>
                <td className="border p-2">
                  {group.semester}
                </td>
                <td className="border p-2">
                  {group.year}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => setSelectedResult(group)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🎯 RESULT MODAL */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white w-3/4 p-6 rounded-2xl shadow-2xl">

            <h3 className="text-xl font-bold mb-4 text-center">
              Result - {selectedResult.student?.user?.name}
            </h3>

            <table className="w-full border text-center mb-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Marks</th>
                  <th className="border p-2">Grade</th>
                </tr>
              </thead>

              <tbody>
                {selectedResult.results.map((res) => (
                  <tr key={res._id}>
                    <td className="border p-2">
                      {res.subject?.name}
                    </td>
                    <td className="border p-2">
                      {res.marksObtained}/{res.totalMarks}
                    </td>
                    <td className="border p-2 font-bold">
                      {res.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ✅ Auto Calculation */}
            {(() => {
              const total = selectedResult.results.reduce(
                (sum, r) => sum + r.marksObtained, 
                0
              );

              const max = selectedResult.results.reduce(
                (sum, r) => sum + r.totalMarks,
                0
              );

              const percentage = ((total / max) * 100).toFixed(2);
              const status = percentage >= 40 ? "PASS" : "FAIL";

              return (
                <div className="text-center mb-4">
                  <p>Total: {total}/{max}</p>
                  <p>Percentage: {percentage}%</p>
                  <p className={`font-bold ${status === "PASS" ? "text-green-600" : "text-red-600"}`}>
                    Status: {status}
                  </p>
                </div>
              );
            })()}

            <div className="flex justify-between">
              <button
                onClick={() => window.print()}
                className="bg-green-500 text-white px-4 py-1 rounded-lg"
              >
                Print
              </button>

              <button
                onClick={() => setSelectedResult(null)}
                className="bg-red-500 text-white px-4 py-1 rounded-lg"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminResultList;













































// import { useState, useMemo } from "react";
// import { useGetResultsQuery } from "../../../features/result/resultApi";

// const AdminResultList = () => {
//   const { data: results = [], isLoading } = useGetResultsQuery();

//   const [search, setSearch] = useState("");
//   const [filterYear, setFilterYear] = useState("");
//   const [selectedResult, setSelectedResult] = useState(null);

//   // 🔥 Group By Student + Year
//   const groupedResults = useMemo(() => {
//     const map = {};

//     results.forEach((res) => {
//       const key = `${res.student?._id}_${res.year}`;

//       if (!map[key]) {
//         map[key] = {
//           student: res.student,
//           year: res.year,
//           semester: res.semester,
//           results: [],
//         };
//       }

//       map[key].results.push(res);
//     });

//     return Object.values(map);
//   }, [results]);

//   // 🔎 Search + Filter
//   const filteredData = groupedResults.filter((group) => {
//     const name = group.student?.user?.name?.toLowerCase() || "";
//     const roll = group.student?.rollNo?.toString() || "";

//     const matchSearch =
//       name.includes(search.toLowerCase()) ||
//       roll.includes(search);

//     const matchYear =
//       filterYear === "" || group.year.toString() === filterYear;

//     return matchSearch && matchYear;
//   });

//   if (isLoading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6 md:ml-0 bg-gray-50 min-h-screen">
//       <div className="bg-white shadow-xl rounded-2xl p-6">

//         <h2 className="text-2xl font-bold mb-6 text-center">
//           🎓 Student Result Management
//         </h2>

//         {/* Search + Filter */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Search by Name or Roll"
//             className="border p-2 rounded-lg w-full"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <input
//             type="number"
//             placeholder="Filter Year"
//             className="border p-2 rounded-lg w-full md:w-40"
//             value={filterYear}
//             onChange={(e) => setFilterYear(e.target.value)}
//           />
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border text-center">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-2">Student</th>
//                 <th className="border p-2">Roll</th>
//                 <th className="border p-2">Semester</th>
//                 <th className="border p-2">Year</th>
//                 <th className="border p-2">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredData.map((group, index) => (
//                 <tr key={index}>
//                   <td className="border p-2">
//                     {group.student?.user?.name}
//                   </td>
//                   <td className="border p-2">
//                     {group.student?.rollNo}
//                   </td>
//                   <td className="border p-2">
//                     {group.semester}
//                   </td>
//                   <td className="border p-2">
//                     {group.year}
//                   </td>
//                   <td className="border p-2">
//                     <button
//                       onClick={() => setSelectedResult(group)}
//                       className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>

//       {/* ================= MODAL ================= */}
//       {selectedResult && (
//         <div className="fixed inset-0 z-50 flex">

//           {/* Desktop Sidebar Space */}
//           <div className="hidden md:block md:w-64"></div>

//           {/* Overlay */}
//           <div
//             className="flex-1 bg-black/50 flex items-center justify-center p-4"
//             onClick={() => setSelectedResult(null)}
//           >
//             <div
//               className="bg-white w-full max-w-3xl p-6 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h3 className="text-xl font-bold mb-4 text-center">
//                 Result - {selectedResult.student?.user?.name}
//               </h3>

//               <table className="w-full border text-center mb-4">
//                 <thead className="bg-gray-200">
//                   <tr>
//                     <th className="border p-2">Subject</th>
//                     <th className="border p-2">Marks</th>
//                     <th className="border p-2">Grade</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {selectedResult.results.map((res) => (
//                     <tr key={res._id}>
//                       <td className="border p-2">
//                         {res.subject?.name}
//                       </td>
//                       <td className="border p-2">
//                         {res.marksObtained}/{res.totalMarks}
//                       </td>
//                       <td className="border p-2 font-bold">
//                         {res.grade}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Calculation */}
//               {(() => {
//                 const total = selectedResult.results.reduce(
//                   (sum, r) => sum + r.marksObtained,
//                   0
//                 );

//                 const max = selectedResult.results.reduce(
//                   (sum, r) => sum + r.totalMarks,
//                   0
//                 );

//                 const percentage = ((total / max) * 100).toFixed(2);
//                 const status = percentage >= 40 ? "PASS" : "FAIL";

//                 return (
//                   <div className="text-center mb-4">
//                     <p>Total: {total}/{max}</p>
//                     <p>Percentage: {percentage}%</p>
//                     <p className={`font-bold ${
//                       status === "PASS"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}>
//                       Status: {status}
//                     </p>
//                   </div>
//                 );
//               })()}

//               <div className="flex justify-between">
//                 <button
//                   onClick={() => window.print()}
//                   className="bg-green-500 text-white px-4 py-1 rounded-lg"
//                 >
//                   Print
//                 </button>

//                 <button
//                   onClick={() => setSelectedResult(null)}
//                   className="bg-red-500 text-white px-4 py-1 rounded-lg"
//                 >
//                   Close
//                 </button>
//               </div>

//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminResultList;










