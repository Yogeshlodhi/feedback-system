import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import FeedbackCard from "../../components/FeedbackCard";
import AcknowledgeModal from "../../components/modals/AcknowledgeModal";

type Feedback = {
  feedback_id: string;
  from_manager: string;
  strengths: string;
  behavior: string;
  area_to_improve: string;
  feedback_type: string;
  received_on: string;
};

const API = import.meta.env.VITE_API_URL;

const MyFeedbacks = () => {
  const [recent, setRecent] = useState<Feedback[]>([]);
  const [past, setPast] = useState<Feedback[]>([]);
  const [ackModalOpen, setAckModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  const fetchFeedbacks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/feedback/my_feedbacks`, {
      headers: { Authorization: `Bearer ${token}` },
    });


    const data: Feedback[] = res.data;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const recent: Feedback[] = [];
    const past: Feedback[] = [];

    data.forEach((fb) => {
      const receivedDate = new Date(fb.received_on);
      if (
        receivedDate.getMonth() === currentMonth &&
        receivedDate.getFullYear() === currentYear
      ) {
        recent.push(fb);
      } else {
        past.push(fb);
      }
    });

    setRecent(recent);
    setPast(past);

  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleAcknowledge = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${API}/feedback/acknowledge/${selectedFeedback?.feedback_id}`,
        { feedback_id: selectedFeedback?.feedback_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        });
      fetchFeedbacks(); 
    } catch (err) {
      console.error("Failed to acknowledge", err);
    } finally {
      setAckModalOpen(false);
      setSelectedFeedback(null);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Feedback</h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Feedback</h2>
          <div className="space-y-6">
            {recent.map((fb, index) => (
              <FeedbackCard
                key={index}
                from={fb.from_manager}
                feedback={fb}
                onAcknowledge={() => {
                  setSelectedFeedback(fb);
                  setAckModalOpen(true);
                }}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Past Feedback</h2>
          <div className="space-y-6">
            {past.map((fb, index) => (
              <FeedbackCard
                key={index}
                from={fb.from_manager}
                feedback={fb}
                onAcknowledge={() => {
                  setSelectedFeedback(fb);
                  setAckModalOpen(true);
                }}
              />
            ))}
          </div>
        </section>
      </div>

      {ackModalOpen && selectedFeedback && (
        <AcknowledgeModal
          feedback={selectedFeedback}
          onClose={() => setAckModalOpen(false)}
          onConfirm={handleAcknowledge}
        />
      )}
    </Layout>
  );
};

export default MyFeedbacks;