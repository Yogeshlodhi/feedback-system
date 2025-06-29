import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  feedback: any;
}

const ViewFeedbackModal: React.FC<Props> = ({ isOpen, onClose, feedback }) => {
  if (!isOpen || !feedback) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">Feedback Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
          <div>
            <p className="text-black text-xl font-medium">Employee</p>
            <p className="text-gray-800">{feedback.employee_name}</p>
          </div>
          <div>
            <p className="text-black text-xl font-medium">Email</p>
            <p className="text-gray-800">{feedback.employee_email}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-black text-xl font-medium">Feedback</p>
            <p className="text-gray-800 whitespace-pre-line">{feedback.feedback}</p>
          </div>
          <div>
            <p className="text-black text-xl font-medium">Sentiment</p>
            <p className="capitalize text-gray-800">{feedback.feedback_type}</p>
          </div>
          <div>
            <p className="text-black text-xl font-medium">Acknowledgement</p>
            <p className="text-gray-800">{feedback.status}</p>
          </div>
          <div>
            <p className="text-black text-xl font-medium">Date</p>
            <p className="text-gray-800">{feedback.date}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-black text-xl font-medium">Area to Improve</p>
            <p className="text-gray-800 whitespace-pre-line">{feedback.area_to_improve}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-black text-xl font-medium">Behavior</p>
            <p className="text-gray-800 whitespace-pre-line">{feedback.behavior}</p>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedbackModal;