import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching from REST API endpoint:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched leaderboard data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed leaderboard:', leaderboardData);
        
        setLeaderboard(leaderboardData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading leaderboard...</span>
        </div>
        <p className="mt-2">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error!</strong> Failed to load leaderboard: {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="display-6 fw-bold mb-2">🏆 Leaderboard</h2>
          <p className="text-muted">Track rankings and compete with other users</p>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Leaderboard Data</h4>
          <p>No leaderboard entries available at the moment. Come back soon!</p>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="fw-bold text-center">Rank</th>
                    <th scope="col" className="fw-bold">User ID</th>
                    <th scope="col" className="fw-bold">Username</th>
                    <th scope="col" className="fw-bold text-end">Points</th>
                    <th scope="col" className="fw-bold text-end">Score</th>
                    <th scope="col" className="fw-bold text-center">Badge</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    let badgeColor = 'secondary';
                    if (rank === 1) badgeColor = 'warning';
                    else if (rank === 2) badgeColor = 'secondary';
                    else if (rank === 3) badgeColor = 'danger';

                    return (
                      <tr key={entry.id || index} className={index < 3 ? 'table-light' : ''}>
                        <td className="text-center">
                          <span className={`badge bg-${badgeColor} fs-6`}>{rank}</span>
                        </td>
                        <td>
                          <span className="badge bg-info">{entry.user_id || entry.user || 'N/A'}</span>
                        </td>
                        <td className="fw-semibold">{entry.username || 'N/A'}</td>
                        <td className="text-end">
                          <span className="badge bg-primary">{entry.points || 0}</span>
                        </td>
                        <td className="text-end">
                          <span className="badge bg-success fs-6">{entry.score || 0}</span>
                        </td>
                        <td className="text-center">
                          {rank === 1 && '🥇'}
                          {rank === 2 && '🥈'}
                          {rank === 3 && '🥉'}
                          {rank > 3 && '⭐'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

