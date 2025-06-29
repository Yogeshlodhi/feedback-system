import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Team from './manager/Team';
import FeedbackTimeline from './employee/FeedbackTimeline';

const Home = () => {

  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      {
        user && user.role === 'manager' ? (
          <Team />
        ) : (
          <FeedbackTimeline/>
        )
      }
    </div>
  )
}

export default Home
