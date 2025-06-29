// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import SignUpPage from './pages/auth/Signup';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoutes';
import { Toaster } from './components/ui/sonner';
import FeedbackTimeline from './pages/employee/FeedbackTimeline';
import MyFeedbacks from './pages/employee/MyFeedbacks';
import SubmitFeedback from './pages/manager/SubmitFeedback';
import FeedbackHistory from './pages/manager/FeedbackHistory';
import Team from './pages/manager/Team';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// import MyFeedback from './pages/employee/MyFeedback';
// import SubmitFeedback from './pages/employee/SubmitFeedback';
// import Team from './pages/manager/Team';
// import ManageFeedback from './pages/manager/ManageFeedback';

function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Toaster richColors />
      <Routes>
        {/* Public */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />

        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Layout + Routes */}

        {/*  Manager Routes */}
        {/* <Route
          path="/team"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <FeedbackHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submit-feedback"
          element={
            <ProtectedRoute>
              <SubmitFeedback />
            </ProtectedRoute>
          }
        />
        {/*  Manager Routes */}

        {/* Employee Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/timeline"
          element={
            <ProtectedRoute>
              <FeedbackTimeline />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/my-feedbacks"
          element={
            <ProtectedRoute>
              <MyFeedbacks />
            </ProtectedRoute>
          }
        />
        {/* Employee Routes */}
      </Routes>
    </Router>
  );
}

export default App;



// import './App.css'
// import LoginPage from './pages/auth/Login'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';

// import { Toaster } from "./components/ui/sonner";
// import SignUpPage from './pages/auth/Signup';


// function App() {

//   return (
//     <Router>
//       <Toaster richColors />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App
