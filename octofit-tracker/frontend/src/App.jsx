import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  return (
    <div className="p-4">
      <h1 className="display-6">Octofit Tracker</h1>
      <p className="lead">Track athletes, teams, training activities, and leaderboard performance.</p>
      <p className="text-muted">
        Configure <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> to use the Codespaces API URL automatically.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded px-3 mb-4">
          <span className="navbar-brand">Octofit</span>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
