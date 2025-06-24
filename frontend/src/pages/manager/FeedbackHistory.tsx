import Layout from "../../components/Layout";
import { useState } from "react";

const feedbackData = [
  {
    employee: "Ethan Harper",
    feedback: "Great work on the recent project, especially the presentation.",
    date: "2023-08-15",
    status: "Completed",
  },
  {
    employee: "Olivia Bennett",
    feedback: "Excellent problem-solving skills during the client meeting.",
    date: "2023-07-20",
    status: "Completed",
  },
  {
    employee: "Noah Carter",
    feedback: "Consistently delivers high-quality work and meets deadlines.",
    date: "2023-06-25",
    status: "Completed",
  },
  {
    employee: "Ava Morgan",
    feedback: "Strong team player and always willing to help colleagues.",
    date: "2023-05-30",
    status: "Completed",
  },
  {
    employee: "Liam Foster",
    feedback: "Demonstrates a proactive approach to learning new technologies.",
    date: "2023-04-05",
    status: "Completed",
  },
];

const FeedbackHistory = () => {
  const [search, setSearch] = useState("");

  const filtered = feedbackData.filter((item) =>
    item.employee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">History</h1>
        <p className="text-sm text-gray-500 mb-6">View all feedback for your team members</p>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by employee..."
            className="w-full max-w-md px-4 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Feedback</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{item.employee}</td>
                  <td className="px-4 py-3 text-gray-600">{item.feedback}</td>
                  <td className="px-4 py-3 text-gray-500">{item.date}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:underline text-sm">Edit</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-6">
                    No feedback found.
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

export default FeedbackHistory;
