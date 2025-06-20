//Demo file for the User controller Logic
import express from 'express';
const router = express.Router();
import User from '../../models/user.model';

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No users found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to select users
 */
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