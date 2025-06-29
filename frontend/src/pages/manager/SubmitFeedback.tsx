import Layout from "../../components/Layout";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";

interface Employee {
  member_id: string;
  username: string;
  email: string;
}

const API = import.meta.env.VITE_API_URL;

const SubmitFeedback = () => {
  const [strengths, setStrengths] = useState("");
  const [behavior, setBehavior] = useState("");
  const [improvement, setImprovement] = useState("");
  const [sentiment, setSentiment] = useState<"Positive" | "Neutral" | "Negative" | "">("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [teamMembers, setTeamMembers] = useState<Employee[]>([]);

  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`${API}/users/team`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Failed to fetch team members", error);
        toast.error("Failed to load team members");
      }
    };

    fetchTeamMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${API}/feedback/submit`,
        {
          employee_id: selectedEmployeeId,
          strengths,
          behavior,
          area_to_improve: improvement,
          feedback_type: sentiment.toLowerCase(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Reset form
      setSelectedEmployeeId("");
      setStrengths("");
      setBehavior("");
      setImprovement("");
      setSentiment("");

      toast.success("Feedback submitted successfully!");
    } catch (err) {
      console.error("Submission failed", err);
      toast.error("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Provide Feedback</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Member Select */}
          <div className="flex mb-6 items-center justify-around">
            <label htmlFor="employee" className="block text-sm font-semibold text-gray-700 mb-2">
              Select Team Member
            </label>
            <select
              id="employee"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              className="w-[50%] border rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="" disabled>-- Select a team member --</option>
              {teamMembers.map((member) => (
                <option key={member.member_id} value={member.member_id}>
                  {member.username}
                </option>
              ))}
            </select>
          </div>

          {/* Strengths */}
          <div>
            <label htmlFor="strengths" className="block text-sm font-semibold text-gray-700 mb-2">Strengths</label>
            <textarea
              id="strengths"
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              rows={4}
              className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="What did this person do well?"
              required
            />
          </div>

          {/* Behavior */}
          <div>
            <label htmlFor="behavior" className="block text-sm font-semibold text-gray-700 mb-2">Behavior</label>
            <textarea
              id="behavior"
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
              rows={4}
              className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="How does this person behave?"
              required
            />
          </div>

          {/* Improvement */}
          <div>
            <label htmlFor="improvement" className="block text-sm font-semibold text-gray-700 mb-2">Areas for Improvement</label>
            <textarea
              id="improvement"
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
              rows={4}
              className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="What could this person improve?"
              required
            />
          </div>

          {/* Sentiment */}
          <div>
            <span className="block text-sm font-semibold text-gray-700 mb-2">Overall Sentiment</span>
            <div className="flex space-x-3">
              {["Positive", "Neutral", "Negative"].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`px-4 py-2 rounded-md text-sm font-medium border ${
                    sentiment === option
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setSentiment(option as typeof sentiment)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              disabled={!selectedEmployeeId || !strengths || !improvement || !sentiment || loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2 rounded-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
              )}
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SubmitFeedback;