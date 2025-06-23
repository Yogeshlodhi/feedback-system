import React from 'react';
import { useState } from 'react';

interface TeamMember {
  name: string;
  role: string;
  feedbackCount: number;
  sentimentTrend: 'Positive' | 'Neutral' | 'Negative';
}

const TeamDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const teamMembers: TeamMember[] = [
    { name: 'Sophia Carter', role: 'Software Engineer', feedbackCount: 12, sentimentTrend: 'Positive' },
    { name: 'Ethan Bennett', role: 'Product Manager', feedbackCount: 8, sentimentTrend: 'Neutral' },
    { name: 'Olivia Hayes', role: 'UX Designer', feedbackCount: 15, sentimentTrend: 'Positive' },
    { name: 'Liam Foster', role: 'Data Analyst', feedbackCount: 5, sentimentTrend: 'Negative' },
    { name: 'Ava Coleman', role: 'Marketing Specialist', feedbackCount: 10, sentimentTrend: 'Positive' },
  ];

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return 'text-green-500';
      case 'Negative': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Team</h1>
        
        <div className="mt-4 flex items-center">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <a href="#" className="ml-4 text-blue-500 hover:underline">#Learn more here</a>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Team Overview</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMembers.map((member, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.feedbackCount}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getSentimentColor(member.sentimentTrend)}`}>
                    {member.sentimentTrend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TeamDashboard;