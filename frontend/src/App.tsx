import './App.css'
import LoginPage from './pages/pages/Login'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/pages/Home';
import NotFoundPage from './pages/pages/NotFound';
import Home from './pages/pages/Home';




function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
