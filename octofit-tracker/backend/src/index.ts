import express from 'express';
import db from './config/database';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

export default app;
