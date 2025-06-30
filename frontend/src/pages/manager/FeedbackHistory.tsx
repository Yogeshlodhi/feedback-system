import axios from "axios";
import Layout from "../../components/Layout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import EditFeedbackModal from "../../components/modals/EditFeedbackModal";
import ViewFeedbackModal from "../../components/modals/ViewFeedbackModal";

import type { FeedbackHistoryType as FeedbackType } from "../../types/feedback"; 

const API = import.meta.env.VITE_API_URL;


const FeedbackHistory = () => {
  const [search, setSearch] = useState("");

  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>();

  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackType | null>(null);


  useEffect(() => {

    const getFeedbacks = async () => {
      try {
        const response = await axios.get(
          `${API}/feedback/submitted`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;

        const formattedData = data.map((item: any) => ({
          feedback_id: item.feedback_id, 
          employee_id: item.employee_id, 
          employee_email: item.employee_email, 
          employee_name: item.employee_name,
          feedback: item.strengths || "No feedback provided",
          date: new Date(item.submitted_at).toLocaleDateString(),
          status: item.acknowledged ? "Completed" : "Pending",
          strengths: item.strengths || "No strengths provided",
          behavior: item.behavior || "No behavior provided",
          area_to_improve: item.area_to_improve || "No area to improve provided",
          feedback_type: item.feedback_type || "neutral", 
        }));

        setFeedbacks(formattedData);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        // setError("Failed to load feedbacks.");
      }
      finally {
        setLoading(false);
      }
    }
    getFeedbacks();

  }, []);

  const filtered = feedbacks?.filter((item) =>
    item?.employee_name?.toLowerCase().includes(search.toLowerCase())
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
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Feedback</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            {
              loading ? (
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      Loading feedback data...
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="divide-y">
                  {/* {filtered.map((item, index) => ( */}
                  {filtered?.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{item.employee_name}</td>
                      <td className="px-4 py-3 text-gray-600">{item.employee_email}</td>
                      <td className="px-4 py-3 text-gray-600">{item.feedback}</td>
                      <td className="px-4 py-3 text-gray-500">{item.date}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 gap-2 flex items-center">
                        <button
                          className="text-blue-600 hover:underline text-sm"
                          onClick={() => {
                            setSelectedFeedback(item); 
                            setEditModalOpen(true); }
                          }
                        >
                          Edit
                        </button> |
                        <button
                          className="text-blue-600 hover:underline text-sm"
                          onClick={() => { 
                            setSelectedFeedback(item); 
                            setViewModalOpen(true); }
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered?.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500 py-6">
                        No feedback found.
                      </td>
                    </tr>
                  )}
                </tbody>
              )
            }



          </table>
        </div>
      </div>
      <EditFeedbackModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        feedback={selectedFeedback}
        token={token!}
        onUpdated={() => window.location.reload()}
      />

      <ViewFeedbackModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        feedback={selectedFeedback}
      />
    </Layout>
  );
};

export default FeedbackHistory;
