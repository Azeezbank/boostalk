// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000', // change to your API base URL
      },
    ],
  },
  apis: ['./src/middlewares/*.ts'], // path to your route files
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
