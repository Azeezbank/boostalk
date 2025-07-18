import express from 'express';
import authentication from '../../middlewares/midleware';
import Circle from '../../models/Circle.model';
import { v4 as uuidv4 } from 'uuid';
import upload from '@/docs/cloudinary.upload';
import CircleMember from '@/models/CircleMember.model';
import Post from '@/models/Post.model';
import User from '@/models/user.model';
import { Op } from 'sequelize';
import Notification from '@/models/Notification.model';
import { idText } from 'typescript';
const router = express.Router();

//Create circle
router.post('/create', authentication, upload.single('profile'), async (req: any, res: any) => {
  const userId = req.user.id;
  const CircleId = uuidv4();
  const CircleMemberId = uuidv4();
  const profile_Pic = req.file?.path || null;
  const { circle_name, description } = req.body;
  const circle = await Circle.create({ id: CircleId, userId, profile_Pic, circle_name, description });
  try {
    await CircleMember.create({ id: CircleMemberId, circleId: circle.id, userId, role: 'Admin', status: 'Approved' });
    res.status(200).json({ message: 'Circle created successfully' });
  } catch (err: any) {
    console.error('Failed to create circle', err.message);
    return res.status(500).json({ message: 'Failed to create circle', circle });
  }
});

//Joing Circle
router.post('/join/:circleId', authentication, async (req: any, res: any) => {
  const userId = req.user.id;
  const circleId = req.params.circleId;
  const type = 'Circle Join Request';
  try {
    const existing = await CircleMember.findOne({ where: { circleId, userId } });
    if (existing) {
      console.log('Already requested or member');
      return res.status(400).json({ message: 'Already requested or member' });
    }

    const request = await CircleMember.create({ circleId, userId });

    const senderNames = await CircleMember.findOne({where: {circleId, userId}, 
      include: [{model: User, attributes: ['Username']}]
    });

    const senderName = senderNames?.sender?.Username;

    // Create a notification for the circle admin
    const circle = await Circle.findByPk(circleId);
    if (!circle) {
      console.log('Circle not found');
      return res.status(404).json({ message: 'Circle not found' });
    }

    const adminMembers = await CircleMember.findAll({
      where: {
        circleId,
        role: 'Admin',
        status: 'Approved'
      }
    });

    const adminIds = adminMembers.map(member => member.userId);

    // Create notifications for each admin
    for (const adminId of adminIds) {
      await Notification.create({
        id: uuidv4(),
        senderId: userId,
        receiverId: adminId,
        type,
        message: `${senderName} has requested to join the circle "${circle.circle_name}".`
      });
    }

    res.status(200).json({ message: 'Request Sent To Join circle', request });

  } catch (err: any) {
    console.error("Failes to send join request", err.message);
    return res.status(500).json({ message: 'Failed to send join request' });
  }
});

// Admin to approve the request
router.post('/approve/:circleId/:userId', authentication, async (req: any, res: any) => {
  const { circleId, userId } = req.params;
  const adminId = req.user.id;
  try {
    const isAdmin = await CircleMember.findOne({ where: { circleId, userId: adminId, role: 'Admin' } });
    if (!isAdmin) {
      console.log('Only Admin can approve requests');
      return res.status(403).json({ message: 'Only Admin can approve requests' });
    }
    const member = await CircleMember.findOne({ where: { circleId, userId },
    include: [{ model: Circle, attributes: ['circle_name'] }]
    });
    if (!member) {
      console.log('User not found in circle');
      return res.status(404).json({ message: 'User not found in circle' });
    }
    member.status = 'Approved';
    await member.save();

    await Notification.create({
      id: uuidv4(),
      senderId: req.user.id,
      receiverId: userId,
      type: 'Circle Join Request Approved',
      message: `Your request to join the circle ${member.Circle.circle_name} has been approved.`
    })

    res.status(200).json({ message: 'Member approved' });
  } catch (err: any) {
    console.error('Failed to approve request', err.message);
    return res.status(500).json({ message: 'Failed to approve request' });
  }
});

// Admin to add new member
router.post('/add_member/:circleId/:userId', authentication, async (req: any, res: any) => {
  const { circleId, memberId } = req.params;
  const adminId = req.user.id;

  try {
    //Check if requester is an admin of the circle
    const adminCheck = await CircleMember.findOne({
      where: {
        userId: adminId,
        circleId,
        role: 'Admin',
        status: 'Approved'
      }
    });

    if (!adminCheck) {
      console.log('Only admins can add members');
      return res.status(403).json({ message: 'Only admins can add members' });
    }

    // Check if the user is already a member
    const existing = await CircleMember.findOne({
      where: {
        circleId,
        userId: memberId
      }
    });

    if (existing) {
      console.log('User is already in the circle or pending approval');
      return res.status(400).json({ message: 'User is already in the circle or pending approval' });
    }

    //Add the user to the circle directly as an approved member
    await CircleMember.create({
      circleId,
      userId: memberId,
      role: 'Member',
      status: 'Approved'
    });

    await Notification.create({
      id: uuidv4(),
      senderId: adminId,
      receiverId: memberId,
      type: 'add_member',
      message: 'You have been added to new circle'
    })

    res.status(200).json({ message: 'User added to circle' });
  } catch (err: any) {
    console.error('Failed to add member to circle', err.message);
    return res.status(500).json({ message: 'Failed to add member to circle' });
  }
});


// Get all circle member's post
router.get('/posts/:circleId', authentication, async (req: any, res: any) => {
  const circleId = req.params.circleId;
  const userId = req.user.id;

  try {
    const isMember = await CircleMember.findOne({
      where: {
        circleId,
        userId,
        status: 'Approved'
      }
    });

    if (!isMember) {
      console.log('User is not an approved member of this circle');
      return res.status(403).json({ message: 'You are not authorized to view posts in this circle.' });
    }

    const members = await CircleMember.findAll({
      where: {
        circleId,
        status: 'Approved'
      },
      attributes: ['userId']
    });

    const memberIds = members.map(member => member.userId);

    //Get posts where userId is among approved members
    const posts = await Post.findAll({
      where: {
        circleId,
        userId: {
          [Op.in]: memberIds
        }
      },
      include: [
        {
          model: User,
          attributes: ['id', 'Username', 'Email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(posts);
  } catch (err: any) {
    console.error('Failed to fetch circle posts', err.message);
    return res.status(500).json({ message: 'Failed to fetch circle posts' });
  }
});

// Get all pending approval requests
router.get('/pending/requests/:circleId', authentication, async (req: any, res: any) => {
  const circleId = req.params.circleId;
  const userId = req.user.id;

  // Check if current user is an admin of the circle
  try {
    const adminCheck = await CircleMember.findOne({
      where: {
        circleId,
        role: 'Admin',
        status: 'Approved'
      }
    });

    if (!adminCheck) {
      return res.status(403).json({ message: 'Only circle admins can view pending requests' });
    }

    // Fetch all pending members
    const pendingRequests = await CircleMember.findAll({
      where: {
        userId,
        circleId,
        status: 'Pending'
      },
      include: [
        {
          model: User,
          attributes: ['id', 'Username', 'Email']
        }
      ]
    });

    return res.status(200).json(pendingRequests);
  } catch (err: any) {
    console.error('Failed to fetch pending requests', err.message);
    return res.status(500).json({ message: 'Failed to fetch pending requests' });
  }
});

//Get the list of user circles
router.get('/my_circle', authentication, async (req: any, res: any) => {
  const userId = req.user.id;
  try {
    const circles = await CircleMember.findAll({ where: { userId},
    attributes: ['id', 'role', 'status'],
    include: [{
      model: Circle,
      attributes: [ 'profile_Pics', 'circle_name', 'description' ]
    }],
    order: [['createdAt', 'DESC']]
    });
    if (!circles || circles.length === 0) {
      console.log('No User Found in the circle');
      return res.status(404).json({ message: 'User Not Found'});
    }

    res.status(200).json(circles);
  } catch (err: any) {
    console.error('Failed to select circles', err.message);
    return res.status(500).json({ message: 'Failed to select circles'});
  }
})

export default router;