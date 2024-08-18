import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import user from './routes/user';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.status(404).send({
    code: res.statusCode,
    text: 'Not Found',
    message: undefined,
    data: undefined,
  });
});

app.use('/user', user);

app.listen(port, () => {
  console.log(`[SERVER] Server is running at http://localhost:${port}`);
});
