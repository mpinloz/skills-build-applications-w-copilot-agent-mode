import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT || 8000);
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

async function buildCollectionPayload(resource: string, model: mongoose.Model<any>) {
  const items = await model.find({}).lean();
  return {
    resource,
    count: items.length,
    items,
    apiBaseUrl,
  };
}

app.get('/', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl, port: PORT });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  res.json(await buildCollectionPayload('users', User));
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  res.json(await buildCollectionPayload('teams', Team));
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  res.json(await buildCollectionPayload('activities', Activity));
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  res.json(await buildCollectionPayload('leaderboard', LeaderboardEntry));
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  res.json(await buildCollectionPayload('workouts', Workout));
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.warn('MongoDB connection skipped:', error);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

start();
