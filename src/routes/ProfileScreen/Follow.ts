import express  from "express";
import authentication from "@/middlewares/midleware";
import Follow from '@/models/Follow.model';
import { v4 as uuidv4} from 'uuid';
import User from "@/models/user.model";
const router = express.Router();

//follow and unfollowing logic
router.post('/:followingId', authentication, async (req: any, res: any) => {
    const followingId = req.params.followingId;
    const followerId = req.user.id
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

//Get the followers
router.get('/followers/:userId', authentication, async (req: any, res: any) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByPk(userId, {
            include: [{model: User, as: 'Followers', attributes: ['id', 'Username']}],
        });

        if (!user) {
            console.log('User Not Found for follow');
            return res.status(404).json({message: 'User Not Found'});
        }
        
        res.status(200).json({followers: user.Followers});
    } catch (err: any) {
        console.error('Failed to fetch followers', err.message);
        return res.status(500).json({message: 'Failed to fetch followers'});
    }
});

//Get the number of following users
router.get('/following/:userId', authentication, async (req: any, res: any) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByPk(userId, {
            include: [{model: User, as: 'following', attributes: ['id', 'Username']}],
        });
        
        res.status(200).json({following: user?.following});
    } catch (err: any) {
        console.error('Failed to fetch following users', err.message);
        return res.status(500).json({message: 'Failed to fetch following users'});
    }
});

export default router;