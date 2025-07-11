import express from 'express';
import Messages from '@/models/Messages.model';
import { Op } from 'sequelize';
import User from '@/models/user.model';
import authentication from '@/middlewares/midleware';
import Profile from '@/models/Profile.model'
const router = express.Router();


//Chats
router.get('/chat/partners', authentication, async (req: any, res: any) => {

  const userId = req.user.id;

  try {

    const messages = await Messages.findAll({
      where: {
        [Op.or]: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: [
    {
      model: User,
      as: 'Sender',
      attributes: ['id', 'Username'],
      include: [
        {
          model: Profile,
          attributes: ['profilePicUrl']
        }
      ]
    },
    {
      model: User,
      as: 'Receiver',
      attributes: ['id', 'Username'],
      include: [
        {
          model: Profile,
          attributes: ['profilePicUrl']
        }
      ]
    }
  ],
      order: [['createdAt', 'DESC']]
    });

    const chatMap = new Map();

    for (const msg of messages) {
      const isSender = msg.senderId === userId;
      const partner = isSender ? msg.Receiver : msg.Sender;
      const partnerId = partner.id;

      if (!chatMap.has(partnerId)) {
        chatMap.set(partnerId, {
          partnerId,
          username: partner?.Username,
          profilePic: partner?.Profile?.profilePicUrl,
          lastMessage: msg.content,
          time: msg.createdAt
        });
      }
    }

    const chatList = Array.from(chatMap.values());
    return res.status(200).json(chatList);
  } catch (error) {
    console.error("Error fetching chats", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



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
      order: [['createdAt', 'ASC']],
    });

    res.status(200).json(messages);
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});


export default router;