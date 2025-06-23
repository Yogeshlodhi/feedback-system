import React from 'react';
import { useState } from 'react';

interface FeedbackItem {
  id: number;
  title: string;
  date: string;
  type: 'Performance Review' | 'Project Completion Feedback' | 'Teamwork Feedback';
}

interface NavItem {
  id: number;
  label: string;
  icon?: string;
}

const MyFeedbackDashboard: React.FC = () => {
  const [activeNavItem, setActiveNavItem] = useState('My Feedback');

  const feedbackItems: FeedbackItem[] = [
    {
      id: 1,
      title: 'Performance Review',
      date: 'October 16, 2023',
      type: 'Performance Review'
    },
    {
      id: 2,
      title: 'Project Completion Feedback',
      date: 'September 20, 2023',
      type: 'Project Completion Feedback'
    },
    {
      id: 3,
      title: 'Teamwork Feedback',
      date: 'August 5, 2023',
      type: 'Teamwork Feedback'
    }
  ];

  const navItems: NavItem[] = [
    { id: 1, label: 'Employee' },
    { id: 2, label: 'Home' },
    { id: 3, label: 'My Feedback' },
    { id: 4, label: 'My Quest' },
    { id: 5, label: 'My Growth Plan' },
    { id: 6, label: 'Resources' }
  ];

  const getFeedbackIcon = (type: FeedbackItem['type']) => {
    switch (type) {
      case 'Performance Review':
        return '📊';
      case 'Project Completion Feedback':
        return '🏆';
      case 'Teamwork Feedback':
        return '👥';
      default:
        return '📝';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800">Section</h1>
          <nav className="mt-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-lg ${activeNavItem === item.label
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setActiveNavItem(item.label)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Admin</h2>
          {/* Admin links would go here */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Feedback</h1>
        </header>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {feedbackItems.map((item) => (
              <li key={item.id} className="hover:bg-gray-50">
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-xl mr-4">{getFeedbackIcon(item.type)}</span>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyFeedbackDashboard;