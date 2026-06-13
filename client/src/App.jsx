import React from "react";
import { Routes, Route } from "react-router-dom";

import StudentLayout from "./components/StudentLayout";
// import StudentLayout from "./components/student/StudentLayout";
import AdminLayout from "./components/admin/AdminLayout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

// ================= CLASS =================
import CreateClass from "./pages/admin/class/CreateClass";
import ManageClasses from "./pages/admin/class/ManageClasses";

// ================= SUBJECT =================
import CreateSubject from "./pages/admin/subject/CreateSubject";
import ManageSubjects from "./pages/admin/subject/ManageSubject";

// ================= STUDENT =================
import CreateStudent from "./pages/admin/student/CreateStudent";
import ManageStudent from "./pages/admin/student/ManageStudent";

// ================= RESULT =================
import AddBulkResult from "./pages/admin/result/AddResult";
import AdminResultList from "./pages/admin/result/AdminResult";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyResult from "./pages/myresult";

function App() {
  return (
    <>
      <Routes>

        {/* ================= STUDENT ROUTES ================= */}
        <Route
          path="/"
          element={
            <StudentLayout>
              <Home />
            </StudentLayout>
          }
        />

        <Route
          path="/login"
          element={
            <StudentLayout>
              <Login />
            </StudentLayout>
          }
        />

        <Route
          path="/admin-login"
          element={
            <StudentLayout>
              <AdminLogin />
            </StudentLayout>
          }
        />


        <Route
          path="/student/result"
          element={
            <StudentLayout>

              <MyResult />
            </StudentLayout>


          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<ProtectedRoute role="admin" />}>

          {/* DASHBOARD */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />

          {/* ================= CLASSES ================= */}
          <Route
            path="/admin/classes/add"
            element={
              <AdminLayout>
                <CreateClass />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/classes/manage"
            element={
              <AdminLayout>
                <ManageClasses />
              </AdminLayout>
            }
          />

          {/* ================= SUBJECTS ================= */}
          <Route
            path="/admin/subjects/create"
            element={
              <AdminLayout>
                <CreateSubject />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/subjects/manage"
            element={
              <AdminLayout>
                <ManageSubjects />
              </AdminLayout>
            }
          />

          {/* ================= STUDENTS ================= */}
          <Route
            path="/admin/students/add"
            element={
              <AdminLayout>
                <CreateStudent />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/students/manage"
            element={
              <AdminLayout>
                <ManageStudent />
              </AdminLayout>
            }
          />

          {/* ================= RESULTS ================= */}
          <Route
            path="/admin/results/add"
            element={
              <AdminLayout>
                <AddBulkResult />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/results/manage"
            element={
              <AdminLayout>
                <AdminResultList />
              </AdminLayout>
            }
          />


        </Route>
      </Routes>

      {/* Toast Notification */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        theme="colored"
      />
    </>
  );
}

export default App;























// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import StudentLayout from "./components/StudentLayout";
// // import StudentLayout from "./components/student/StudentLayout";
// import AdminLayout from "./components/admin/AdminLayout";

// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import AdminLogin from "./pages/admin/AdminLogin";
// import Dashboard from "./pages/admin/Dashboard";

// import ProtectedRoute from "./routes/ProtectedRoute";

// // ================= CLASS =================
// import CreateClass from "./pages/admin/class/CreateClass";
// import ManageClasses from "./pages/admin/class/ManageClasses";

// // ================= SUBJECT =================
// import CreateSubject from "./pages/admin/subject/CreateSubject";
// import ManageSubjects from "./pages/admin/subject/ManageSubject";

// // ================= STUDENT =================
// import CreateStudent from "./pages/admin/student/CreateStudent";
// import ManageStudent from "./pages/admin/student/ManageStudent";

// // ================= RESULT =================
// import AddBulkResult from "./pages/admin/result/AddResult";
// import AdminResultList from "./pages/admin/result/AdminResult";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import MyResult from "./pages/myresult";

// function App() {
//   return (
//     <>
//       <Routes>
//         {/* ================= STUDENT ROUTES ================= */}

//         <Route
//           path="/"
//           element={
//             <StudentLayout>
//               <Home />
//             </StudentLayout>
//           }
//         />

//         <Route
//           path="/login"
//           element={
//             <StudentLayout>
//               <Login />
//             </StudentLayout>
//           }
//         />

//         <Route
//           path="/admin-login"
//           element={
//             <StudentLayout>
//               <AdminLogin />
//             </StudentLayout>
//           }
//         />

//         <Route
//           path="/student/result"
//           element={
//             <StudentLayout>
//               <MyResult />
//             </StudentLayout>
//           }
//         />

//         {/* ================= ADMIN ROUTES ================= */}

//         <Route element={<ProtectedRoute role="admin" />}>
//           {/* DASHBOARD */}
//           <Route
//             path="/admin/dashboard"
//             element={
//               <AdminLayout>
//                 <Dashboard />
//               </AdminLayout>
//             }
//           />

//           {/* ================= CLASSES ================= */}
//           <Route
//             path="/admin/classes/add"
//             element={
//               <AdminLayout>
//                 <CreateClass />
//               </AdminLayout>
//             }
//           />

//           <Route
//             path="/admin/classes/manage"
//             element={
//               <AdminLayout>
//                 <ManageClasses />
//               </AdminLayout>
//             }
//           />

//           {/* ================= SUBJECTS ================= */}
//           <Route
//             path="/admin/subjects/create"
//             element={
//               <AdminLayout>
//                 <CreateSubject />
//               </AdminLayout>
//             }
//           />

//           <Route
//             path="/admin/subjects/manage"
//             element={
//               <AdminLayout>
//                 <ManageSubjects />
//               </AdminLayout>
//             }
//           />

//           {/* ================= STUDENTS ================= */}
//           <Route
//             path="/admin/students/add"
//             element={
//               <AdminLayout>
//                 <CreateStudent />
//               </AdminLayout>
//             }
//           />

//           <Route
//             path="/admin/students/manage"
//             element={
//               <AdminLayout>
//                 <ManageStudent />
//               </AdminLayout>
//             }
//           />

//           {/* ================= RESULTS ================= */}
//           <Route
//             path="/admin/results/add"
//             element={
//               <AdminLayout>
//                 <AddBulkResult />
//               </AdminLayout>
//             }
//           />

//           <Route
//             path="/admin/results/manage"
//             element={
//               <AdminLayout>
//                 <AdminResultList />
//               </AdminLayout>
//             }
//           />
//         </Route>
//       </Routes>

//       {/* Toast Notification */}
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         newestOnTop
//         theme="colored"
//       />
//     </>
//   );
// }

// export default App;
