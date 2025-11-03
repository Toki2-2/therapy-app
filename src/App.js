import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TherapistPage from './pages/TherapistPage';
import ClientPage from './pages/ClientPage';
import SessionPage from './pages/SessionPage';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage logo={logo} />} />
          <Route path="/therapist" element={<TherapistPage />} />
          <Route path="/client" element={<ClientPage />} />
          <Route path="/session" element={<SessionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;