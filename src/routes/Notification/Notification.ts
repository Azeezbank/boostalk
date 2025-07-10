import express from 'express';
import CircleMember from '@/models/CircleMember.model';
import Notification from '@/models/Notification.model';
import authentication from '@/middlewares/midleware';
const router = express.Router();

//Get user notifications
router.get('/', authentication, async (req: any, res: any) => {
    const userId = req.user.id;
    try {
        const notifications = await Notification.findAll({
            where: { receiverId: userId },
            order: [['createdAt', 'DESC']],
        })
        if (notifications.length === 0) {
            console.log('No notifications found for user');
            return res.status(404).json({ message: "No notifications found." });
        }

        res.status(200).json({ notifications });
    } catch (err: any) {
        console.error('Failed to fetch notifications', err.message);
        return res.status(500).json({ message: 'Failed to fetch notifications' });
    }
});


//Get only admin's notification
router.get('/admin', authentication, async (req: any, res: any) => {
    const adminId = req.user.id;
    try {
        const isAdmin = await CircleMember.findOne({
            where: 
            { userId: adminId,
            role: 'Admin',
            status: 'Approved'
            }
        })
        if (!isAdmin) {
            console.log('User is not an admin');
            return res.status(403).json({ message: "You are not authorized to view notifications." });
        }
        // Fetch notifications for the admin
        const notification = await Notification.findAll({
            where: { receiverId: adminId },
            order: [['createdAt', 'DESC']],
        })
        if (notification.length === 0) {
            console.log('No notifications found for admin');
            return res.status(404).json({ message: "No notifications found." });
        }

        res.status(200).json({ notifications: notification });
    } catch (err: any) {
        console.error('Failed to fetch notifications', err.message);
        return res.status(500).json({ message: 'Failed to fetch notifications' });
    }
});

export default router;