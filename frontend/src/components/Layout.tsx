import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react'; 

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  if (!user) return null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Sidebar Drawer for Mobile */}

      <div className={`fixed inset-0 z-50 flex transition-all duration-300 ${sidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Slide-in Sidebar */}
        <div
          className={`w-64 bg-white shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>

        {/* Backdrop */}
        <div
          onClick={() => setSidebarOpen(false)}
          className={`flex-1 backdrop-blur-sm bg-transparent bg-opacity-20 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
        ></div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-20 flex-shrink-0 bg-white flex items-center justify-between px-4 md:px-6 border-b">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
            title="Open sidebar menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <h1 className="text-xl font-semibold hidden md:block"></h1>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <img
                src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.email}`}
                className="w-8 h-8 rounded-full"
                alt="avatar"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 py-2">
                <div className="px-4 py-2 text-sm text-gray-600 border-b">
                  Hello, <span className="font-medium break-all">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;