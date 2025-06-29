import Layout from "../../components/Layout";
import clsx from "clsx";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { MessageSquare } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

const typeColorMap = {
  Positive: "bg-green-100 text-green-800",
  Neutral: "bg-blue-100 text-blue-800",
  Negative: "bg-red-100 text-red-800",
  "Needs Improvement": "bg-yellow-100 text-yellow-800",
};

const FeedbackTimeline = () => {
  const { token } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await axios.get(`${API}/feedback/timeline`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        const formatted = data.map((item: any) => ({
          strengths: item.strengths || "Feedback Entry",
          date: new Date(item.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric"
          }),
          description: item.area_to_improve || "No description provided.",
          type: capitalize(item.feedback_type || "Neutral"),
        }));

        setFeedbacks(formatted);
      } catch (error) {
        console.error("Error fetching feedback timeline:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [token]);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10">
        <h2 className="text-3xl uppercase font-bold text-gray-800 mb-6 text-center">Feedback Timeline</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading timeline...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-500">No feedbacks yet.</p>
        ) : (
          <div className="relative border-l-2 border-blue-100 pl-6 space-y-10">
            {feedbacks.map((fb, idx) => (
              <div key={idx} className="relative">
                {/* Dot */}
                <span className="absolute -left-4 top-1 w-8 h-8 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center shadow-sm">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </span>

                {/* Content */}
                <div className="pl-8">
                  <h3 className="text-lg font-semibold text-gray-800">{fb.strengths}</h3>
                  <p className="text-sm text-blue-600 mb-1">{fb.date}</p>
                  <p className="text-gray-600 text-sm">{fb.description}</p>
                  <span
                    className={clsx(
                      "mt-2 inline-block text-xs px-3 py-1 rounded-full font-semibold",
                      typeColorMap[fb.type as keyof typeof typeColorMap]
                    )}
                  >
                    {fb.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FeedbackTimeline;