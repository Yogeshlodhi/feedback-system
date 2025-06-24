import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  if (!user) return null;

  // Close dropdown when clicked outside
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
    <div className="min-h-screen w-full flex bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <header className="h-20 bg-white flex items-center justify-between px-6 border-b relative">
          <h1 className="text-xl font-semibold"></h1>

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

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;





// // src/components/Layout.tsx

// import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import Sidebar from './Sidebar';

// const Layout = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) return null; // Don't render anything if no user

//   return (
//     <div className="min-h-screen w-full flex bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar/>

//       {/* Main Content */}
//       <div className="flex-1">
//         <header className="h-20 bg-white flex items-center justify-between px-6 border-b">
//           <h1 className="text-xl font-semibold"></h1>
//           <div className="flex items-center space-x-4">
//             <span className="text-sm text-gray-600">Hello, {user.email}</span>
//             <img
//               src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.email}`}
//               className="w-8 h-8 rounded-full"
//               alt="avatar"
//             />
//           </div>
//         </header>

//         <main className="p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
