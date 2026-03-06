import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RoundView from './pages/RoundView';
import TeamDetail from './pages/TeamDetail';
import QualifierRound5 from './pages/QualifierRound5';
import QualifierTeamStatus from './pages/QualifierTeamStatus';
import CreateProblem from './pages/CreateProblem';
import Leaderboard from './pages/Leaderboard';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/round/:roundId" element={<ProtectedRoute><RoundView /></ProtectedRoute>} />
        <Route path="/round/:roundId/team/:teamName" element={<ProtectedRoute><TeamDetail /></ProtectedRoute>} />

        {/* New Qualifier Routes */}
        <Route path="/qualifier-round-5" element={<ProtectedRoute><QualifierRound5 /></ProtectedRoute>} />
        <Route path="/qualifier-round-5/team/:teamName" element={<ProtectedRoute><QualifierTeamStatus /></ProtectedRoute>} />

        {/* Create Problem */}
        <Route path="/create-problem" element={<ProtectedRoute><CreateProblem /></ProtectedRoute>} />

        {/* Leaderboard */}
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
