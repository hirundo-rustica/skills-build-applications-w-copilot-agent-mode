import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching from REST API endpoint:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched activities data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed activities:', activitiesData);
        
        setActivities(activitiesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading activities...</span>
        </div>
        <p className="mt-2">Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error!</strong> Failed to load activities: {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="display-6 fw-bold mb-2">📋 Activities</h2>
          <p className="text-muted">Track and manage all your fitness activities</p>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Activities Found</h4>
          <p>There are currently no activities to display. Start tracking your fitness journey today!</p>
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
                    <th scope="col" className="fw-bold">Type</th>
                    <th scope="col" className="fw-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td>
                        <span className="badge bg-primary">{activity.id}</span>
                      </td>
                      <td className="fw-semibold">{activity.name || 'N/A'}</td>
                      <td>{activity.description || 'N/A'}</td>
                      <td>
                        <span className="badge bg-success">{activity.type || 'N/A'}</span>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-primary">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;

