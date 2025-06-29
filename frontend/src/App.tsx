import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import SignUpPage from './pages/auth/Signup';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoutes';
import { Toaster } from './components/ui/sonner';
import MyFeedbacks from './pages/employee/MyFeedbacks';
import SubmitFeedback from './pages/manager/SubmitFeedback';
import FeedbackHistory from './pages/manager/FeedbackHistory';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Toaster richColors />
      <Routes>

        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={<SignUpPage />} />

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