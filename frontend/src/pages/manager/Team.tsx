import axios from "axios";
import Layout from "../../components/Layout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

type TeamMember = {
  username: string;
  position: string;
  feedback_count: number;
  sentiment_trend: "Positive" | "Neutral" | "Negative";
};

const API = import.meta.env.VITE_API_URL;

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
  const [team, setTeam] = useState<TeamMember[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const { token } = useContext(AuthContext);
  
  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError(null);


    const fetchTeamData = async () => {
      // const response = await new Promise<TeamMember[]>((resolve) => {
      const response = await axios.get<TeamMember[]>(`${API}/users/team`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.data;
      setTeam(data);
      setLoading(false);

    };

    fetchTeamData();
  }, []);

  const filteredTeam = team?.filter((member) =>
    member?.username?.toLowerCase().includes(search?.toLowerCase())
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
          {loading ? (
            <p className="text-center py-6 text-gray-500">
              Loading team data...
            </p>
          ) :
            (
              <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 text-sm">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Feedback Count</th>
                    <th className="px-4 py-3">Sentiment Trend</th>
                  </tr>
                </thead>
                {/* <tbody> */}
                <tbody className="divide-y">
                  {filteredTeam?.map((member, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{member.username}</td>
                      <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">{member.position}</td>
                      <td className="px-4 py-3 text-gray-600">{member.feedback_count}</td>
                      <td className={`px-4 py-3 font-medium ${sentimentColors[member.sentiment_trend]}`}>
                        {member.sentiment_trend}
                      </td>
                    </tr>
                  ))}
                  {filteredTeam?.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-500 py-6">
                        No team members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </Layout>
  );
};

export default Team;
