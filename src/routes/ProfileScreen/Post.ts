// Post files will be going here...
import express from 'express';
import User from '../../models/user.model';
import Post from '../../models/Post.model';
import authentication from '../../middlewares/midleware';
import { v4 as uuidv4 } from 'uuid';
import follow from '@/models/Follow.model';
import upload from '@/docs/cloudinary.upload';

const router = express.Router();

//Create post
router.post('/create', authentication, upload.single('image'),  async (req: any, res: any) => {
    const userId = req.user.id;
    const id = uuidv4(); 
    const { title, content } = req.body;
    const imageUrl = req.file?.path || null;
    const circleId = req.params.CircleId || null;
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
        userId: user.id,
        image: imageUrl,
        circleId
    })

    res.status(200).json({message: 'Post created successfully'});
} catch (err: any) {
    console.error('Error creating post:', err);
    res.status(500).json({message: 'Internal Server Error'});
}
});

// Get all posts, public feed
router.get('/public/feed', authentication, async (req: any, res: any) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ posts });
    } catch (err: any) {
        console.error('Failes to select posts', err.message)
        return res.status(500).json({message: 'Failes to select posts'})
    }
});

//Get posts of followers
router.get('/followers', authentication, async (req: any, res: any) => {
    const followerId = req.user.id;
    try {

        //Get Users this user follow
        const following = await follow.findAll({ where: {followerId}, attributes: ['followingId']
        });

        const followingIds = following.map(f => f.followingId);

        // If the user is not following anyone
        if (followingIds.length === 0) {
            console.log('User Not following Anyone');
            return res.status(200).json({posts: []});
        }

        // fetch post from them
        const posts = await Post.findAll({ where: {userId: followingIds}, 
            include: [{model: User, attributes: ['id', 'Username']}],
            order: [['createdAt', 'DESC']]
        });
        
        res.status(200).json(posts)
    } catch (err: any) {
        console.error('Failed to fetch posts', err.message)
        return res.status(500).json({message: 'Failed to fetch posts'});
    }
});


export default router;