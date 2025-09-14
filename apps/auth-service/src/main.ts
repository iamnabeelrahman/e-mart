import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 6000;

app.use(
  cors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

const server = app.listen(port, () => {
  console.log(`Auth service is listening at http://localhost:${port}/api`);
});

server.on('error', (error) => {
  console.error('Server error in auth-service:', error);
});
