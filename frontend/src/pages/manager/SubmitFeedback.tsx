import Layout from "../../components/Layout";
import { useState } from "react";

const SubmitFeedback = () => {
  const [strengths, setStrengths] = useState("");
  const [improvement, setImprovement] = useState("");
  const [sentiment, setSentiment] = useState<"Positive" | "Neutral" | "Negative" | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ strengths, improvement, sentiment });
    // TODO: Send feedback to backend
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Provide Feedback for Alex</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Strengths */}
          <div>
            <label htmlFor="strengths" className="block text-sm font-semibold text-gray-700 mb-2">
              Strengths
            </label>
            <textarea
              id="strengths"
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              rows={4}
              className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="What did this person do well?"
              required
            />
          </div>

          {/* Areas for Improvement */}
          <div>
            <label htmlFor="improvement" className="block text-sm font-semibold text-gray-700 mb-2">
              Areas for Improvement
            </label>
            <textarea
              id="improvement"
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
              rows={4}
              className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="What could this person improve?"
              required
            />
          </div>

          {/* Overall Sentiment */}
          <div>
            <span className="block text-sm font-semibold text-gray-700 mb-2">Overall Sentiment</span>
            <div className="flex space-x-3">
              {["Positive", "Neutral", "Negative"].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`px-4 py-2 rounded-md text-sm font-medium border ${
                    sentiment === option
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setSentiment(option as typeof sentiment)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              disabled={!strengths || !improvement || !sentiment}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2 rounded-md disabled:opacity-50"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SubmitFeedback;
