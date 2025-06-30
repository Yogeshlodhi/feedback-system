export interface FeedbackCard{
    feedback_id: string;
    from_manager: string;
    strengths: string;
    behavior: string;
    area_to_improve: string;
    feedback_type: string;
    received_on: string;
    acknowledged?: boolean; // Optional, if you want to track acknowledgment
};

export interface FeedbackCardProps {
    from: string;
    feedback: FeedbackCard;
    onAcknowledge: () => void;
}

export interface MyFeedbackType {
  feedback_id: string;
  from_manager: string;
  strengths: string;
  behavior: string;
  area_to_improve: string;
  feedback_type: string;
  received_on: string;
};

export interface FeedbackHistoryType {
  feedback_id: string; 
  employee_id: string; 
  employee_name: string;
  employee_email: string;
  feedback: string; 
  date: string; 
  status: string;
  strengths?: string;
  behavior?: string; 
  area_to_improve?: string; 
  feedback_type?: 'positive' | 'negative' | 'neutral'; 
};