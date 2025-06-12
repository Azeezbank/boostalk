//Comments file will be going here
import express from 'express';
import User from '../../models/user.model';
import Post from '../../models/Post.model';
import authentication from '../../middlewares/midleware';
import Comment from '../../models/Comment.model';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

//Create comment
router.post('/:postId', authentication, async (req: any, res: any) => {
    const userId  = req.user.id;
    const id = uuidv4();
    const { content } = req.body;
    const { postId } = req.params.postId;
    try {
        const user = await User.findByPk(userId);
        const post = await Post.findByPk(postId);

        if (!user || !post) {
            console.log('User or Post Not Found');
            return res.status(404).json({message: 'User or Post Not Found'})
        }

        await Comment.create({
            id: id,
            content,
            userId,
            postId
        })

        res.status(200).json({message: 'Comment created successfully'})
    } catch (err: any) {
        if (err) {
            console.error('Filed to create comment', err.message);
            return res.status(500).json({message: 'Filed to create comment'})
        }
    }
});

export default router;