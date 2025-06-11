// Routes files will be going here...
import express from 'express';
import User from '../models/user.model';
import Post from '../models/Post.model';
import authentication from '../middlewares/midleware';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', authentication,  async (req: any, res: any) => {
    const userId = req.user.id;
    const id = uuidv4(); 
    const { title, content } = req.body;
    try {
    const user = await User.findOne({where: {id: userId}});

    if (!user) {
        console.log('User Not Found');
        return res.status(404).json({message: 'User Not Found.'});
    }

    await Post.create({
        id: id,
        title,
        content,
        userId: user.id
    })

    res.status(200).json({message: 'Post created successfully'});
} catch (err: any) {
    console.error('Error creating post:', err);
    res.status(500).json({message: 'Internal Server Error'});
}
});

export default router;