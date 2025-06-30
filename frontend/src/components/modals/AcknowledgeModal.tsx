import type {AcknowledgeModalProps} from './modal.types';


const AcknowledgeModal = ({ feedback, onClose, onConfirm }: AcknowledgeModalProps) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Acknowledge Feedback</h2>
      <p className="text-sm text-gray-600">
        Are you sure you want to acknowledge this feedback?
      </p>
      <div className="text-sm text-gray-700 space-y-1">
        <p><strong>From:</strong> {feedback.from_manager}</p>
        <p><strong>Strengths:</strong> {feedback.strengths}</p>
        <p><strong>Behavior:</strong> {feedback.behavior}</p>
        <p><strong>Improvement:</strong> {feedback.area_to_improve}</p>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Yes, I Acknowledge
        </button>
      </div>
    </div>
  </div>
);

export default AcknowledgeModal;