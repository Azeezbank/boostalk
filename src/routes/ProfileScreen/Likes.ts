//likes files goes here
import express from 'express';
import Likes from '@/models/Likes.model';
import authentication from '@/middlewares/midleware';
import { v4 as uuidv4 } from 'uuid';
import Notification from '@/models/Notification.model';
import User from '@/models/user.model';
import Post from '@/models/Post.model';
const router = express.Router();

// Route to like or unlike a post
router.post('/:postId', authentication, async (req: any, res: any) => {
    const postId = req.params.postId;
    const userId = req.user.id;
    const id = uuidv4(); // Generate a unique UUID for the post
    try {
        const existingLike = await Likes.findOne({ where: { userId, postId } });

        // Check if the like already exists
        if (!existingLike) {
            await Likes.create({ id, userId, postId }); //Like

            // Get the post owner
            const post = await Post.findByPk(postId, {
                include: [{ model: User, attributes: ['id', 'Username'] }]
            });

            // Create a notification for the person they liked
            if (post && post.User && post.User.id !== userId) {
                // Avoid sending a notification to yourself
                await Notification.create({
                    id: uuidv4(),
                    senderId: userId,
                    receiverId: post?.User.id,
                    type: 'like',
                    message: `Your post has been liked by ${post?.User.Username}`
                });
            }

            return res.status(200).json({ message: 'Post liked successfully' });
        } else {
            // If it exists, destroy it to unlike
            await Likes.destroy({ where: { userId, postId } });
            return res.status(200).json({ message: 'Post unliked successfully' });
        }
    } catch (err: any) {
        console.error('Failed to like or unlike', err.message);
        return res.status(500).json({ message: 'Failed to like or unlike post' });
    }
});

export default router;