const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./src/routes/auth.routes');
const taskRoutes = require('./src/routes/task.routes');
const errorHandler = require('./src/middleware/error.middleware');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API versioning prefix
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Scalable API with Auth',
    version: '1.0.0',
    description: 'Demo API for assignment'
  },
  servers: [{ url: 'http://localhost:' + (process.env.PORT || 4000) + '/api/v1' }]
};
const options = {
  swaggerDefinition,
  apis: [] 
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => res.json({ message: 'API running' }));

app.use(errorHandler);

module.exports = app;
