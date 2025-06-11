// Middleware to protect route
import JWT from 'jsonwebtoken';


const authentication = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting: Bearer <token>
  if (!token) return res.status(403).json({ message: 'Token is missing' });

  JWT.verify(token, process.env.SECRET_KEY as string, (err: any, user: any) => {
    if (err) {
      console.error('Token is invalid', err)
      return res.status(401).json({ message: 'Token is invalid' });
    }


    req.user = user; // store decoded user info
    next();
});
};

export default authentication;