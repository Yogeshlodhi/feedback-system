import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null;

  const isManager = user.role === 'manager';
  const isEmployee = user.role === 'employee';

  const isActive = (path: string) =>
    location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700";

  const linkClass = (path: string) =>
    `block text-lg transition-all duration-200 hover:underline hover:text-blue-400 ${isActive(path)}`;

  return (
    <aside className="h-full bg-white border-r">
      <div className="p-6 font-bold text-xl border-b">Feedback System</div>
      <nav className="p-4 space-y-2">
        {isManager && (
          <>
            <a href="/" className={linkClass("/")} onClick={closeSidebar}>Team</a>
            <a href="/history" className={linkClass("/history")} onClick={closeSidebar}>Feedback History</a>
            <a href="/submit-feedback" className={linkClass("/submit-feedback")} onClick={closeSidebar}>Submit Feedback</a>
          </>
        )}

        {isEmployee && (
          <>
            <a href="/" className={linkClass("/")} onClick={closeSidebar}>Feedback Timelines</a>
            <a href="/my-feedbacks" className={linkClass("/my-feedbacks")} onClick={closeSidebar}>My Feedbacks</a>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;