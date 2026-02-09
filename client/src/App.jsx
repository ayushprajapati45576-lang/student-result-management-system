import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StudentLayout from './components/StudentLayout'
import Login from './pages/Login'
import Home from './pages/Home'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CreateClass from './pages/admin/class/CreateClass'
import ManageClasses from './pages/admin/class/ManageClasses'
import CreateSubject from './pages/admin/subject/CreateSubject'
import ManageSubjects from './pages/admin/subject/ManageSubject'

function App() {
  return (
    <>
      <Routes>

        {/* student routes */}
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

        {/* admin routes */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />

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

          <Route
            path="/admin/subjects/create"
            element={
              <AdminLayout>
                <CreateSubject />
              </AdminLayout>
            }
          />

          ✅ {/* FIX HERE */}
          <Route
            path="/admin/subjects/manage"
            element={
              <AdminLayout>
                <ManageSubjects />
              </AdminLayout>
            }
          />

        </Route>
      </Routes>

      {/* 🔔 Toast Alerts */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        theme="colored"
      />
    </>
  )
}

export default App
