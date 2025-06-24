import Layout from "../../components/Layout";
import { useState } from "react";

const teamData = [
  {
    name: "Sophia Carter",
    role: "Software Engineer",
    feedbackCount: 12,
    sentiment: "Positive",
  },
  {
    name: "Ethan Bennett",
    role: "Product Manager",
    feedbackCount: 8,
    sentiment: "Neutral",
  },
  {
    name: "Olivia Hayes",
    role: "UX Designer",
    feedbackCount: 15,
    sentiment: "Positive",
  },
  {
    name: "Liam Foster",
    role: "Data Analyst",
    feedbackCount: 5,
    sentiment: "Negative",
  },
  {
    name: "Ava Coleman",
    role: "Marketing Specialist",
    feedbackCount: 10,
    sentiment: "Positive",
  },
];

const sentimentColors: Record<string, string> = {
  Positive: "text-green-600",
  Neutral: "text-yellow-500",
  Negative: "text-red-500",
};

const Team = () => {
  const [search, setSearch] = useState("");

  const filteredTeam = teamData.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">My Team</h1>
        <p className="text-sm text-gray-500 mb-6">View your team members and their feedback stats</p>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search team members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Team Overview</h2>
          <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Feedback Count</th>
                <th className="px-4 py-3">Sentiment Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredTeam.map((member, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{member.name}</td>
                  <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">{member.role}</td>
                  <td className="px-4 py-3 text-gray-600">{member.feedbackCount}</td>
                  <td className={`px-4 py-3 font-medium ${sentimentColors[member.sentiment]}`}>
                    {member.sentiment}
                  </td>
                </tr>
              ))}
              {filteredTeam.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-6">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Team;
