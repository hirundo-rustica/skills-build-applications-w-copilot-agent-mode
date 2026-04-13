import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching from REST API endpoint:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched workouts data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed workouts:', workoutsData);
        
        setWorkouts(workoutsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading workouts...</span>
        </div>
        <p className="mt-2">Loading workouts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error!</strong> Failed to load workouts: {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="display-6 fw-bold mb-2">💪 Workouts</h2>
          <p className="text-muted">Discover and explore personalized workout plans</p>
        </div>
        <div className="col-12">
          <button className="btn btn-primary">
            ➕ Create New Workout
          </button>
        </div>
      </div>

      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Workouts Found</h4>
          <p>There are currently no workouts available. Create one to get started!</p>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="fw-bold">ID</th>
                    <th scope="col" className="fw-bold">Name</th>
                    <th scope="col" className="fw-bold">Description</th>
                    <th scope="col" className="fw-bold text-center">Duration (min)</th>
                    <th scope="col" className="fw-bold">Difficulty</th>
                    <th scope="col" className="fw-bold">Created</th>
                    <th scope="col" className="fw-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => {
                    const getDifficultyBadge = (difficulty) => {
                      const level = (difficulty || '').toLowerCase();
                      if (level.includes('easy')) return 'bg-success';
                      if (level.includes('medium') || level.includes('intermediate')) return 'bg-warning';
                      if (level.includes('hard') || level.includes('difficult')) return 'bg-danger';
                      return 'bg-secondary';
                    };

                    return (
                      <tr key={workout.id}>
                        <td>
                          <span className="badge bg-primary">{workout.id}</span>
                        </td>
                        <td className="fw-semibold">{workout.name || 'N/A'}</td>
                        <td>{workout.description || 'N/A'}</td>
                        <td className="text-center">
                          <span className="badge bg-info">{workout.duration || 0}</span>
                        </td>
                        <td>
                          <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                            {workout.difficulty || 'N/A'}
                          </span>
                        </td>
                        <td>
                          <small className="text-muted">
                            {workout.created_date ? new Date(workout.created_date).toLocaleDateString() : 'N/A'}
                          </small>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-primary">Start</button>
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

export default Workouts;
