const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'todo_api',
      version: '1.0.0',
      description: 'API documentation for Your Project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/v1/routes/*.js', './src/v2/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
