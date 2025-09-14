import express from 'express';
import cors from 'cors';
import { errorMiddleware } from '../../../packages/middleware/error-middleware';
import cookieParser from 'cookie-parser';

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
app.use(express.json({ limit: '100mb' }));
app.use(cookieParser());

// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ extended: true, limit: '100mb' }));

app.get('/', (req, res) => {
  res.send({ message: 'Hello API from auth-service' });
});


app.use(errorMiddleware )
const server = app.listen(port, () => {
  console.log(`Auth service is listening at http://localhost:${port}/api`);
});

server.on('error', (error) => {
  console.error('Server error in auth-service:', error);
});
