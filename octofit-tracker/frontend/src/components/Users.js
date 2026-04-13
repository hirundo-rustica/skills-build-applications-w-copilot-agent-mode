import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespaceUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        console.log('Fetching from REST API endpoint:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched users data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed users:', usersData);
        
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading users...</span>
        </div>
        <p className="mt-2">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error!</strong> Failed to load users: {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="display-6 fw-bold mb-2">👤 Users</h2>
          <p className="text-muted">View all registered users and their profiles</p>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Users Found</h4>
          <p>No user accounts have been registered yet.</p>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="fw-bold">ID</th>
                    <th scope="col" className="fw-bold">Username</th>
                    <th scope="col" className="fw-bold">Email</th>
                    <th scope="col" className="fw-bold">Name</th>
                    <th scope="col" className="fw-bold">Joined</th>
                    <th scope="col" className="fw-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <span className="badge bg-primary">{user.id}</span>
                      </td>
                      <td className="fw-semibold">{user.username || 'N/A'}</td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">
                          {user.email || 'N/A'}
                        </a>
                      </td>
                      <td>
                        {user.first_name || user.last_name ? (
                          `${user.first_name || ''} ${user.last_name || ''}`.trim()
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td>
                        <small className="text-muted">
                          {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}
                        </small>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-primary">Profile</button>
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

export default Users;
