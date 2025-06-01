import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/Swagger'; 
import authRoutes from './middlewares/Auth.js';


const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 // Example test route
 app.get('/', (_req:any, res: any) => {
 res.send('API is running...');
 });

// Route for authentication
app.use("/api/auth", authRoutes);

export default app;
