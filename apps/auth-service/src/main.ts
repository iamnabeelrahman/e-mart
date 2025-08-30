import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import proxy from 'express-http-proxy';
import swaggerUi from 'swagger-ui-express';
import axios from 'axios';

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
app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(morgan('dev'));

app.set('trust proxy', 1);

// Proxy setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req: any) => (req.user ? 1000 : 100), // limit each IP to 100 requests for unauthenticated users, 1000 for authenticated users
  message: `Too many requests, please try again later!`,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: any) => req.ip
});
app.use(limiter);

// Swagger setup
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Auth Service API',
    version: '1.0.0',
    description: 'API documentation for the Auth Service',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],
  paths: {
    '/': {
      get: {
        summary: 'Root endpoint',
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Hello API',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});

server.on('error', console.error);
