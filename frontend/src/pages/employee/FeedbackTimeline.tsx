import Layout from '../../components/Layout';
import clsx from 'clsx';

const feedbacks = [
  {
    title: 'Performance Review',
    date: 'October 15, 2023',
    description: 'Your performance this quarter has exceeded expectations in leadership and ownership.',
    type: 'Positive'
  },
  {
    title: 'Project Completion Feedback',
    date: 'September 20, 2023',
    description: 'Project X was delivered on time. A few communication gaps were noticed in the final phase.',
    type: 'Needs Improvement'
  },
  {
    title: 'Teamwork Feedback',
    date: 'August 5, 2023',
    description: 'Great collaboration with cross-functional teams. Appreciated by peers.',
    type: 'Positive'
  },
  {
    title: 'Teamwork Feedback',
    date: 'August 5, 2023',
    description: 'Great collaboration with cross-functional teams. Appreciated by peers.',
    type: 'Positive'
  },
  {
    title: 'Teamwork Feedback',
    date: 'August 5, 2023',
    description: 'Great collaboration with cross-functional teams. Appreciated by peers.',
    type: 'Positive'
  },
  {
    title: 'Teamwork Feedback',
    date: 'August 5, 2023',
    description: 'Great collaboration with cross-functional teams. Appreciated by peers.',
    type: 'Positive'
  },
  {
    title: 'Teamwork Feedback',
    date: 'August 5, 2023',
    description: 'Great collaboration with cross-functional teams. Appreciated by peers.',
    type: 'Positive'
  },
];

const typeColorMap = {
  Positive: 'bg-green-100 text-green-800',
  'Needs Improvement': 'bg-yellow-100 text-yellow-800',
};

const FeedbackTimeline = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Feedback Timeline</h2>

        <div className="relative border-l-2 border-blue-100 pl-6 space-y-10">
          {feedbacks.map((fb, idx) => (
            <div key={idx} className="relative ">
              {/* Dot */}
              <span className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
                {/* <FaBullhorn className="text-blue-500 text-sm" /> */}
                -
              </span>

              {/* Content */}
              <div className='pl-8'>
                <h3 className="text-lg font-semibold text-gray-800">{fb.title}</h3>
                <p className="text-sm text-blue-600 mb-1">{fb.date}</p>
                <p className="text-gray-600 text-sm">{fb.description}</p>
                <span
                  className={clsx(
                    'mt-2 inline-block text-xs px-3 py-1 rounded-full font-semibold',
                    typeColorMap[fb.type as keyof typeof typeColorMap]
                  )}
                >
                  {fb.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackTimeline;
