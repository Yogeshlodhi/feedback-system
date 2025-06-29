// import { useContext } from 'react'
import { useContext } from 'react';
import Layout from '../components/Layout'
import { AuthContext } from '../context/AuthContext';
import Team from './manager/Team';
import FeedbackTimeline from './employee/FeedbackTimeline';
// import Team from './manager/Team';

const Home = () => {

  const { user } = useContext(AuthContext);

  return (
    // <Layout>
    <div className="min-h-screen w-full flex bg-gray-50">
      {
        user && user.role === 'manager' ? (
          <Team />
        ) : (
          <FeedbackTimeline/>
        )
      }
    </div>
    // <div className="text-center text-2xl font-bold mt-10">
    //   <div>
    //     Welcome to the Team Tool
    //   </div>
    // </div>
    // </Layout>

  )
}

export default Home
