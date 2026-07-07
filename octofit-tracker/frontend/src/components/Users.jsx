import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to load users (${response.status})`);
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items || [];
        setUsers(items);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading users…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Users</h2>
      <div className="row g-3">
        {users.map((user) => (
          <div key={user._id || user.username} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{user.fullName || user.username}</h3>
                <p className="mb-1"><strong>Username:</strong> {user.username}</p>
                <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="mb-0"><strong>Age:</strong> {user.age ?? '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
