import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error(`Failed to load leaderboard (${response.status})`);
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items || [];
        setEntries(items);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading leaderboard…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <div className="list-group">
        {entries.map((entry) => (
          <div key={entry._id || entry.username} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h3 className="h6 mb-1">{entry.username}</h3>
              <p className="mb-0 text-muted">Rank #{entry.rank}</p>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
