// import { useContext } from 'react'
import Layout from '../components/Layout'
// import { AuthContext } from '../context/AuthContext';
// import Team from './manager/Team';

const Home = () => {

  // const { user } = useContext(AuthContext);

  return (
    <Layout>
      <div className="text-center text-2xl font-bold mt-10">
        <div>
          Welcome to the Team Tool
        </div>
      </div>
    </Layout>

  )
}

export default Home
