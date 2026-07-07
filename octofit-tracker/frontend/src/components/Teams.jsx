import { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to load teams (${response.status})`);
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items || [];
        setTeams(items);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading teams…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Teams</h2>
      <div className="row g-3">
        {teams.map((team) => (
          <div key={team._id || team.name} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{team.name}</h3>
                <p className="mb-1"><strong>Sport:</strong> {team.sport}</p>
                <p className="mb-1"><strong>Captain:</strong> {team.captain}</p>
                <p className="mb-0"><strong>Members:</strong> {team.members?.join(', ') || '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
