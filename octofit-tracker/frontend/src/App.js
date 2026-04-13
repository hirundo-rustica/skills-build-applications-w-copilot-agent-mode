import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

console.log('App loaded - Codespace Name:', process.env.REACT_APP_CODESPACE_NAME);
console.log('Backend API Base URL: https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/');

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Menu */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container">
            <Link className="navbar-brand fw-bold fs-4" to="/">
              🐙 OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    📋 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    👥 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👤 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-5">
          <div className="container">
            <p className="mb-0">&copy; 2026 OctoFit Tracker. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Home Component
function Home() {
  return (
    <div className="home-container">
      <div className="container py-5">
        {/* Hero Section */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow-lg bg-gradient">
              <div className="card-body text-center p-5">
                <h1 className="display-5 fw-bold mb-3">Welcome to OctoFit Tracker</h1>
                <p className="lead mb-4">Track your fitness activities, compete with friends, and achieve your goals!</p>
                <p className="text-muted mb-4">A comprehensive fitness tracking platform with team competitions and personalized insights.</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Link to="/activities" className="btn btn-primary btn-lg px-4 gap-3">
                    📋 Explore Activities
                  </Link>
                  <Link to="/leaderboard" className="btn btn-outline-secondary btn-lg px-4">
                    🏆 View Leaderboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="row g-4 mb-5">
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">📋 Activities</h5>
                <p className="card-text">Track all your fitness activities and monitor your progress over time.</p>
                <Link to="/activities" className="btn btn-sm btn-primary">View</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">🏆 Leaderboard</h5>
                <p className="card-text">Check standings and compete with other users in real-time.</p>
                <Link to="/leaderboard" className="btn btn-sm btn-primary">View</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">👥 Teams</h5>
                <p className="card-text">Create and manage teams to collaborate with friends.</p>
                <Link to="/teams" className="btn btn-sm btn-primary">View</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">💪 Workouts</h5>
                <p className="card-text">Discover personalized workout suggestions tailored to you.</p>
                <Link to="/workouts" className="btn btn-sm btn-primary">View</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
