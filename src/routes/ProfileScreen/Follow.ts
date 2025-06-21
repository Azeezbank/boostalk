import express  from "express";
import authentication from "@/middlewares/midleware";
import Follow from '@/models/Follow.model';
import { v4 as uuidv4} from 'uuid';
const router = express.Router();

//follow and unfollowing logic
router.post('/:followingId', authentication, async (req: any, res: any) => {
    const followingId = req.params.followingId;
    const followerId = req.user.id
    const id = uuidv4();
    try {
        if (followerId === followingId) {
            console.log('Error, You cannot follow yourself');
            return res.status(400).json({message: 'Error, You cannot follow yourself'});
        }

        const existingFollow = await Follow.findOne({ where: { followerId, followingId } });

        if (existingFollow) {
            // Unfollow
            await existingFollow.destroy();
            return res.json({ message: 'Unfollowed', following: false });
        } else {
            // Follow
            const id = uuidv4();
            await Follow.create({ id, followerId, followingId });
            return res.status(200).json({ message: 'Followed', following: true });
        }

    } catch (err: any) {
        console.error('Action Failed', err.message)
        return res.status(500).json({message: 'Action Failed'});
    }
});

export default router;