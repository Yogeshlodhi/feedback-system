import clsx from "clsx";

import type { FeedbackCardProps } from "../types/feedback";

const FeedbackCard = ({ from, feedback, onAcknowledge }: FeedbackCardProps) => (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-100 hover:shadow-lg transition duration-200 space-y-3">
        <p className="text-sm text-gray-500"><strong>From:</strong> {from}</p>
        <p className="text-sm text-gray-700"><strong>Strengths:</strong> {feedback.strengths}</p>
        <p className="text-sm text-gray-700"><strong>Behavior:</strong> {feedback.behavior}</p>
        <p className="text-sm text-gray-700"><strong>Area to Improve:</strong> {feedback.area_to_improve}</p>
        <p className="text-sm text-gray-700"><strong>Type:</strong> {feedback.feedback_type}</p>
        <p className="text-sm text-gray-500"><strong>Received on:</strong> {new Date(feedback.received_on).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>

        <button
            onClick={onAcknowledge}
            disabled={feedback.acknowledged}
            className={clsx(
                "mt-2 px-4 py-2 text-sm font-semibold text-white rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                feedback.acknowledged
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
            )}
        >
            {feedback.acknowledged ? "Acknowledged" : "Acknowledge"}
        </button>

    </div>
);

export default FeedbackCard;
