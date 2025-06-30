export interface AcknowledgeModalFeedback {
  feedback_id: string;
  from_manager: string;
  strengths: string;
  behavior: string;
  area_to_improve: string;
  feedback_type: string;
  received_on: string;
};

export interface AcknowledgeModalProps {
  feedback: AcknowledgeModalFeedback;
  onClose: () => void;
  onConfirm: () => void;
}

export interface EditFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: any;
  token: string;
  onUpdated?: () => void;
}

export interface ViewFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: any;
}