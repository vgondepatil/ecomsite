import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Add from './pages/Add'
import Additems from './pages/Additems'
import Orders from './pages/Orders'
import Analytics from './pages/Analytics'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// import Additems from './pages/Additems'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthProvider>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path='/additems' element={<Add token={token} />} /> */}

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                  <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                  <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/additems" element={<Additems />} />
                        <Route path="/add" element={<Add />} />
                        
                        {/* <Route path='/add' element={<Additems token={token} />} /> */}
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/analytics" element={<Analytics />} />
                        
                      </Routes>
                    </div>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
