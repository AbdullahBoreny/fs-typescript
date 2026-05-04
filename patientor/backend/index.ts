import express from 'express';
import cors from 'cors';
import diagnoseRouter from './src/routes/diagnoseRouter.ts';
import patientsRouter from './src/routes/patientsRouter.ts';
const app = express();

app.use(express.json());
app.use(cors());
const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRouter);
app.listen(PORT, () => {
  console.log(`Server running on http//localhost:${PORT}`);
});