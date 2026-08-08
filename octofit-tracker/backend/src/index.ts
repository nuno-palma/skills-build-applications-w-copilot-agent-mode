import express from 'express';
import db from './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

const waitForDatabase = async () => {
  if (db.readyState === 1) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    db.once('open', () => resolve());
    db.once('error', reject);
  });
};

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().populate('captain').populate('members').lean();
  res.json(teams);
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();
  res.json(activities);
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('user').populate('team').lean();
  res.json(leaderboard);
});

void (async () => {
  try {
    await waitForDatabase();
    app.listen(port, () => {
      console.log(`Server listening on ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
})();

export default app;
