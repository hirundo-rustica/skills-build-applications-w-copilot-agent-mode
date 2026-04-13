import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching from REST API endpoint:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched teams data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed teams:', teamsData);
        
        setTeams(teamsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading teams...</span>
        </div>
        <p className="mt-2">Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error!</strong> Failed to load teams: {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="display-6 fw-bold mb-2">👥 Teams</h2>
          <p className="text-muted">Browse and manage fitness teams</p>
        </div>
        <div className="col-12">
          <button className="btn btn-primary">
            ➕ Create New Team
          </button>
        </div>
      </div>

      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Teams Found</h4>
          <p>There are currently no teams available. Create a new team to get started!</p>
        </div>
      ) : (
        <div className="row g-4">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold">{team.name || 'Unnamed Team'}</h5>
                    <span className="badge bg-primary">{team.id}</span>
                  </div>
                  <p className="card-text text-muted">{team.description || 'No description available'}</p>
                  <div className="mb-3">
                    <small className="text-muted">
                      <strong>Members:</strong> {team.members_count || team.members?.length || 0}
                    </small>
                  </div>
                  <div className="mb-3">
                    <small className="text-muted">
                      <strong>Created:</strong> {team.created_date ? new Date(team.created_date).toLocaleDateString() : 'N/A'}
                    </small>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-top">
                  <button className="btn btn-sm btn-primary w-100">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;

