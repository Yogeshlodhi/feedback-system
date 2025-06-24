// src/components/Sidebar.tsx

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null; // Don't render anything if no user

  const isManager = user.role === 'manager';
  const isEmployee = user.role === 'employee';

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-6 font-bold text-xl border-b">Feedback System</div>
      <nav className="p-4 space-y-2">
        {/* <a className="block text-lg text-gray-700 hover:text-black" href="/">Dashboard</a> */}

        {isManager && (
          <>
            <a className="block text-lg text-gray-700 hover:text-black" href="/team">Team</a>
            <a className="block text-lg text-gray-700 hover:text-black" href="/history">Feedback History</a>
            <a className="block text-lg text-gray-700 hover:text-black" href="/submit-feedback">Submit Feedback</a>
          </>
        )}

        {isEmployee && (
          <>
            <a className="block text-lg text-gray-700 hover:text-black" href="/home">Home</a>
            <a className="block text-lg text-gray-700 hover:text-black" href="/timeline">Feedback Timelines</a>
            <a className="block text-lg text-gray-700 hover:text-black" href="/my-feedbacks">My Feedbacks</a>
            {/* <a className="block text-lg text-gray-700 hover:text-black" href="/submit-feedback">Submit Feedback</a> */}
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
