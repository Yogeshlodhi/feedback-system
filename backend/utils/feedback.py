from typing import List
from models.feedback import Feedback, FeedbackType

def get_sentiment_trend(feedbacks: List[Feedback]) -> str:
    
    if not feedbacks:
        return "No Feedback"

    positive = 0
    neutral = 0
    negative = 0

    for fb in feedbacks:
        if fb.feedback_type == FeedbackType.POSITIVE:
            positive += 1
        elif fb.feedback_type == FeedbackType.NEGATIVE:
            negative += 1
        elif fb.feedback_type == FeedbackType.NEUTRAL:
            neutral += 1

    if positive >= max(neutral, negative):
        return "Positive"
    elif negative >= max(positive, neutral):
        return "Negative"
    else:
        return "Neutral"

    # sentiment_counter = Counter(fb.feedback_type.value for fb in feedbacks)

    # if feedback_count == 0:
    #     sentiment_trend = "No Feedback"
    # else:
    #     # Choose sentiment with the highest count
    #     sentiment_trend = sentiment_counter.most_common(1)[0][0].capitalize()