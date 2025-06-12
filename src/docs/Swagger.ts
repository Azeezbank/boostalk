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
        url: 'https://boostalk.onrender.com',
      },
    ],
  },
  apis: ['./src/docs/*.ts'], // path to route files
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
