
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Textarea } from "../ui/textarea";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  feedback: any;
  token: string;
  onUpdated?: () => void;
}

const API = import.meta.env.VITE_API_URL;

const EditFeedbackModal: React.FC<Props> = ({
  isOpen,
  onClose,
  feedback,
  token,
  onUpdated,
}) => {
  const [editedFeedback, setEditedFeedback] = useState("");
  const [behavior, setBehavior] = useState("");
  const [improvement, setImprovement] = useState("");
  const [sentiment, setSentiment] = useState<"positive" | "neutral" | "negative" | "">("");

//   console.log("EditFeedbackModal feedback:", feedback);

  useEffect(() => {
    if (feedback) {
      setEditedFeedback(feedback.feedback || "");
      setBehavior(feedback.behavior || "");
      setImprovement(feedback.area_to_improve || "");
      setSentiment(feedback.feedback_type || "");
    }
  }, [feedback]);

  if (!isOpen || !feedback) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${API}/feedback/${feedback.feedback_id}`,
        {
          strengths: editedFeedback,
          behavior,
          area_to_improve: improvement,
          feedback_type: sentiment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose();
      onUpdated?.();
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Feedback</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Strengths
            </label>
            <Textarea
              value={editedFeedback}
              onChange={(e) => setEditedFeedback(e.target.value)}
              className="w-full border p-2 rounded text-sm"
              rows={4}
              placeholder="Enter strengths or feedback..."
              required
            />
          </div>

          {/* Behavior */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Behavior
            </label>
            <Textarea
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
              className="w-full border p-2 rounded text-sm"
              rows={4}
              placeholder="Describe observed behavior..."
              required
            />
          </div>

          {/* Improvement */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Areas for Improvement
            </label>
            <Textarea
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
              className="w-full border p-2 rounded text-sm"
              rows={4}
              placeholder="What could this person improve?"
              required
            />
          </div>

          {/* Sentiment */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Overall Sentiment
            </label>
            <div className="flex space-x-3 mt-2">
              {["positive", "neutral", "negative"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
                    sentiment === option
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setSentiment(option as typeof sentiment)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!editedFeedback || !behavior || !improvement || !sentiment}
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFeedbackModal;