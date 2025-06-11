// Routes files will be going here...
import express from 'express';
import User from '../models/user.model';
import Post from '../models/Post.model';
import authentication from '../middlewares/midleware';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

//Create post
/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               content:
 *                 type: string
 *                 example: This is the content of the blog post.
 *     responses:
 *       200:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post created successfully
 *       404:
 *         description: User Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
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