import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ setSidebarOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { seller, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    phone: ''
  })

  useEffect(() => {
    if (seller) {
      setFormData({
        name: seller.name || '',
        email: seller.email || '',
        businessName: seller.businessName || '',
        phone: seller.phone || ''
      })
    }
  }, [seller])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your update profile logic here
    setIsEditing(false)
  }

  console.log('Current seller data:', seller)
  
  const searchRef = useRef(null)
  const profileRef = useRef(null)

  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          className="text-gray-500 focus:outline-none lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center">
          <div className="relative">
            <input
              className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-primary-500 focus:outline-none"
              type="text"
              placeholder="Search..."
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          <div ref={profileRef} className="relative ml-3">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 focus:outline-none"
              aria-label="User menu"
            >
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={seller?.avatar || "https://via.placeholder.com/200"}
                  alt={seller?.name || "Profile"}
                />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {seller?.name || "Loading..."}
              </span>
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                {!isEditing ? (
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">Profile Info</h3>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-gray-500"><span className="font-medium">Name:</span> {seller?.name}</p>
                    <p className="text-sm text-gray-500"><span className="font-medium">Email:</span> {seller?.email}</p>
                    <p className="text-sm text-gray-500"><span className="font-medium">Business:</span> {seller?.businessName || 'Not set'}</p>
                    <p className="text-sm text-gray-500"><span className="font-medium">Phone:</span> {seller?.phone || 'Not set'}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Edit Profile</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-700">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700">Business Name</label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
                        />
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                <div className="border-t border-gray-100"></div>
                {/* <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </Link> */}
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <div className="border-t border-gray-100"></div>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar