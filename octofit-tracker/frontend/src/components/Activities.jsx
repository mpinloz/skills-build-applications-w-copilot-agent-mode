import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'));
        if (!response.ok) {
          throw new Error(`Failed to load activities (${response.status})`);
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items || [];
        setActivities(items);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading activities…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Activities</h2>
      <div className="row g-3">
        {activities.map((activity) => (
          <div key={activity._id || `${activity.userId}-${activity.type}`} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{activity.type}</h3>
                <p className="mb-1"><strong>User:</strong> {activity.userId}</p>
                <p className="mb-1"><strong>Duration:</strong> {activity.durationMinutes} min</p>
                <p className="mb-0"><strong>Calories:</strong> {activity.calories ?? '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
