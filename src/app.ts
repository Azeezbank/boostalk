import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/Swagger'; 
import authRoutes from './middlewares/Auth.js';
import users from './routes/ProfileScreen/User';
import post from './routes/ProfileScreen/Post';
import comment from './routes/ProfileScreen/Comment';
import like from './routes/ProfileScreen/Likes';
import follow from './routes/ProfileScreen/Follow';
import initializeSocket from './routes/messages/socket';
import http from 'http';
import { Server } from 'socket.io';
import messages from './routes/messages/Messages';
import profile from '@/routes/Profile/Profile';
import Circle from '@/routes/Circle/Circle';
import notification from '@/routes/Notification/Notification';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // replace with frontend URL in production
    methods: ["GET", "POST"]
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 // Example test route
 app.get('/', (req:any, res: any) => {
 res.send('API is running...');
 });

// Route for authentication
app.use("/api/auth", authRoutes);

//Get all Uers
app.use("/api/get/all/users", users);

// Route for posts
app.use('/api/post', post);

//Route for comment
app.use('/api/comment', comment);

//Route for liked
app.use('/api/toggle-like', like);

//Route for follow
app.use('/api/follow', follow);

//Route to messags
app.use('/api/messages', messages)

// Initialize socket logic
initializeSocket(io);

//Route to profile
app.use('/api/profile', profile);

//Circle section
app.use('/api/circle', Circle);

//Handle notification
app.use('/api/notification', notification);

export { app, server };