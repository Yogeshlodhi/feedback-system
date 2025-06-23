import React, { useState } from 'react';

interface FeedbackItem {
  employee: string;
  feedback: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Draft';
  id: number;
}

const FeedbackHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'Employee' | 'Feedback' | 'Date' | 'Status'>('Employee');

  const feedbackData: FeedbackItem[] = [
    {
      id: 1,
      employee: 'Ethan Harper',
      feedback: 'Great work on the recent project, especially the presentation.',
      date: '2023-08-15',
      status: 'Completed'
    },
    {
      id: 2,
      employee: 'Olivia Bennett',
      feedback: 'Excellent problem-solving skills during the client meeting.',
      date: '2023-07-20',
      status: 'Completed'
    },
    {
      id: 3,
      employee: 'Noah Carter',
      feedback: 'Consistently delivers high-quality work and meets deadlines.',
      date: '2023-06-25',
      status: 'Completed'
    },
    {
      id: 4,
      employee: 'Ava Morgan',
      feedback: 'Strong team player and always willing to help colleagues.',
      date: '2023-05-30',
      status: 'Completed'
    },
    {
      id: 5,
      employee: 'Liam Foster',
      feedback: 'Demonstrates a proactive approach to learning new technologies.',
      date: '2023-04-05',
      status: 'Completed'
    },
  ];

  const filteredFeedback = feedbackData.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    switch (activeFilter) {
      case 'Employee':
        return item.employee.toLowerCase().includes(searchLower);
      case 'Feedback':
        return item.feedback.toLowerCase().includes(searchLower);
      case 'Date':
        return item.date.includes(searchTerm);
      case 'Status':
        return item.status.toLowerCase().includes(searchLower);
      default:
        return true;
    }
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">History</h1>
        <p className="text-gray-600 mt-2">View all feedback for your team members</p>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Search</h2>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {(['Employee', 'Feedback', 'Date', 'Status'] as const).map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-lg ${activeFilter === filter 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder={`Search by ${activeFilter.toLowerCase()}...`}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredFeedback.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.employee}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 max-w-md">{item.feedback}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(item.date)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackHistory;