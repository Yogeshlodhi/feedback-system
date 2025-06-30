
export interface Employee {
  member_id: string;
  username: string;
  email: string;
}

export interface TeamMember {
  username: string;
  position: string;
  feedback_count: number;
  sentiment_trend: "Positive" | "Neutral" | "Negative";
};