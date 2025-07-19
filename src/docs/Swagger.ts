// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Boostalk',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
      {
        url: 'https://boostalk.onrender.com',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'Bearer',
          bearerFormat: 'JWT', // Optional, helps Swagger UI show that it expects a JWT
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/docs/*.ts'], // Adjust to where your route docs are
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);