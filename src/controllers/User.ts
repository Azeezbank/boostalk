//Demo file for the User controller Logic
import express from 'express';
const router = express.Router();
import User from '../models/user.model';

router.get("/", async (req: any, res: any) => {
    try {
        const user = await User.findAll();
          if (user.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
        res.status(200).json({ user });
    } catch (err: any) {
        console.error('Failed to get all user', err.message);
        return res.status(500).json({message: 'Failed to select users'})
    }
})

export default router;