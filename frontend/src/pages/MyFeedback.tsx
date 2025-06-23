import React from 'react';

interface FeedbackItem {
  id: number;
  source: string;
  title: string;
  content: string;
  date?: string;
  isRecent?: boolean;
}

const MyFeedback: React.FC = () => {
  const feedbackData: FeedbackItem[] = [
    {
      id: 1,
      source: 'From Manager',
      title: 'Great work on the project!',
      content: 'We have a dedicated job building for team and delivering the project on time. Your communications and problem-solving skills were crucial to the success. Keep up the great work!',
      isRecent: true
    },
    {
      id: 2,
      source: 'From Manager',
      title: 'Excellent presentation skills',
      content: 'Your presentation to the client was very well-informed. You clearly articulated the value proposition we achieved that increases effectively. Consider taking your techniques with the team.',
      date: '2023-07-15'
    },
    {
      id: 3,
      source: 'From Manager',
      title: 'Improvement in time management',
      content: "I've noticed significant improvements in your time management skills. You're working conditions consistently and providing a clear effectively. Keep focusing on this area.",
      date: '2023-06-10'
    }
  ];

  const recentFeedback = feedbackData.find(item => item.isRecent);
  const pastFeedback = feedbackData.filter(item => !item.isRecent);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Feedback</h1>
      </header>

      {recentFeedback && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Recent Feedback</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <p className="font-medium text-gray-700 mb-2">{recentFeedback.source}</p>
            <h3 className="text-lg font-bold text-gray-800 mb-3">{recentFeedback.title}</h3>
            <p className="text-gray-600 whitespace-pre-line">{recentFeedback.content}</p>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Past Feedback</h2>
        <div className="space-y-8">
          {pastFeedback.map((feedback) => (
            <div key={feedback.id} className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-gray-700">{feedback.source}</p>
                {feedback.date && (
                  <span className="text-sm text-gray-500">
                    {new Date(feedback.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">{feedback.title}</h3>
              <p className="text-gray-600 whitespace-pre-line">{feedback.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyFeedback;