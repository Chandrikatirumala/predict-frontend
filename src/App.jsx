import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';

// Main Components
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';

// Auth Components
import Login from './Components/Login';
import SignUp from './Components/SignUp';

// Prediction Components
import CareerPrediction from './Components/Predictions/CareerPrediction';
import LovePrediction from './Components/Predictions/LovePrediction';
import AllPredictions from './Components/Predictions/AllPredictions';



// Other Components
import TarotReading from './Components/TarotReading';
import Contact from './Components/Contact';
import About from './Components/About';
import Home from './Components/Home';
import FortuneTeller from './Components/FortuneTeller';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="pt-16 px-4">
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/signup" element={!currentUser ? <SignUp /> : <Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fortuneteller" element={<FortuneTeller />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tarot-reading"
            element={
              <ProtectedRoute>
                <TarotReading />
              </ProtectedRoute>
            }
          />
          <Route
            path="/career-prediction"
            element={
              <ProtectedRoute>
                <CareerPrediction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/love-prediction"
            element={
              <ProtectedRoute>
                <LovePrediction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-predictions"
            element={
              <ProtectedRoute>
                <AllPredictions />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
