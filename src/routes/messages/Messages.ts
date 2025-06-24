import express from 'express';
import Messages from '@/models/Messages.model';
import { Op } from 'sequelize';
import User from '@/models/user.model';
const router = express.Router();


// GET /messages/:userId/:chatPartnerId
router.get('/:userId/:chatPartnerId', async (req, res) => {
  const { userId, chatPartnerId } = req.params;

  try {
    const messages = await Messages.findAll({
      where: {
        [Op.or]: [
          {
            senderId: userId,
            receiverId: chatPartnerId,
          },
          {
            senderId: chatPartnerId,
            receiverId: userId,
          },
        ],
      },
      include: [
        { model: User, as: 'Sender', attributes: ['id', 'Username'] },
        { model: User, as: 'Receiver', attributes: ['id', 'Username'] },
      ],
      order: [['timestamp', 'ASC']],
    });

    res.status(200).json(messages);
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;