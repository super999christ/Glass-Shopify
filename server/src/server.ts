import cors from 'cors';
import express from 'express';

import { AppDataSource } from './database/connection';
import { authMiddleware, login } from './routes/login';
import { searchOrders } from './routes/searchOrders';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/api/login', login);
app.get('/api/search', authMiddleware, searchOrders);

AppDataSource.initialize().then(() => {
  console.log('Connected to the database successfully!');
});

app.listen(port, () => {
  return console.log(`Server is listening at port ${port}`);
});
