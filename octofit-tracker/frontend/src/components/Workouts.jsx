import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('workouts'));
        if (!response.ok) {
          throw new Error(`Failed to load workouts (${response.status})`);
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.items || [];
        setWorkouts(items);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading workouts…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Workouts</h2>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id || workout.title} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">{workout.title}</h3>
                <p className="mb-1"><strong>Category:</strong> {workout.category}</p>
                <p className="mb-1"><strong>Duration:</strong> {workout.durationMinutes} min</p>
                <p className="mb-0"><strong>Focus:</strong> {workout.focus || '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
