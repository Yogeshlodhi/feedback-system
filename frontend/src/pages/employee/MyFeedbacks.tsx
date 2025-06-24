import Layout from '../../components/Layout';

const feedbacks = {
  recent: [
    {
      from: 'Manager',
      title: 'Great work on the project!',
      content:
        'You did an excellent job leading the team and delivering the project on time. Your communication and problem-solving skills were crucial to the success. Keep up the great work!',
    },
  ],
  past: [
    {
      from: 'Manager 1',
      title: 'Excellent presentation skills',
      content:
        'Your presentation to the client was very well-received. You clearly articulated the value proposition and addressed their concerns effectively. Consider sharing your techniques with the team.',
    },
    {
      from: 'Manager 2',
      title: 'Improvement in time management',
      content:
        'I\'ve noticed a significant improvement in your time management skills. You\'re meeting deadlines consistently and prioritizing tasks effectively. Keep focusing on this area.',
    },
  ],
};

const FeedbackCard = ({
  from,
  title,
  content,
}: {
  from: string;
  title: string;
  content: string;
}) => (
  <div className="bg-white shadow-md rounded-lg p-5 border border-gray-100 hover:shadow-lg transition duration-200">
    <p className="text-sm text-gray-500 mb-1">From: {from}</p>
    <h3 className="font-semibold text-gray-800 text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm mb-4">{content}</p>
    <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
      Acknowledge
    </button>
  </div>
);

const MyFeedbacks = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Feedback</h1>

        {/* Recent Feedback */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Feedback</h2>
          <div className="space-y-6">
            {feedbacks.recent.map((fb, index) => (
              <FeedbackCard key={index} {...fb} />
            ))}
          </div>
        </div>

        {/* Past Feedback */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Past Feedback</h2>
          <div className="space-y-6">
            {feedbacks.past.map((fb, index) => (
              <FeedbackCard key={index} {...fb} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyFeedbacks;
