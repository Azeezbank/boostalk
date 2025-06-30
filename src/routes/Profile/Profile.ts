import upload from '@/docs/cloudinary.upload';
import express from 'express';
import User from '@/models/user.model';
import Profile from '@/models/Profile.model';
import { v4 as uuidv4} from 'uuid';
import authentication from '@/middlewares/midleware';


const router = express.Router();

router.patch('/:id', authentication, upload.fields([
    {name: 'profilePic', maxCount: 1},
    {name: 'coverPic', maxCount: 1}
]), async (req: any, res: any) => {
    try {
        const userId = req.user.id;
        const { Username, Phone, Email, bio } = req.body;

        //Find user with profile
        const user = await User.findByPk(userId, {include: Profile});
        if (!user) {
            console.log('User Not Found');
            return res.status(404).json({message: 'User Not Found'});
        }
        //Updated profile
            if (Username) user.Username = Username;
            if (Phone) user.Phone = Phone;
            if (Email) user.Email = Email;
            await user.save();

            //Imageges Url
            const profilePicUrl = req.files['profilePic']?.[0]?.path;
            const coverPicUrl = req.files['coverPic']?.[0]?.path;
            console.log('Profile pic url', profilePicUrl, 'And cover url', coverPicUrl);

            //Find user profile
            const id = uuidv4();
            let profile = await Profile.findOne({where: {userId}});
            if (!profile) {
                profile = await Profile.create({
                    id,
                    userId,
                    profilePicUrl,
                    coverPicUrl,
                    bio
                })
            } else {
                await profile.update({
                    profilePicUrl: profilePicUrl || profile.profilePicUrl,
                    coverPicUrl: coverPicUrl || profile.coverPicUrl
                })
            }
            res.status(200).json({ message: 'User Profile Updated Successfully'})
    } catch (err: any) {
        console.error('Error', err.message);
        return res.status(500).json({message: 'Something went wrong'})
    }
});


router.get('/', authentication, async (req: any, res: any) => {
    const userId = req.user.id;
    try {
    const user = await User.findOne({ where: { id: userId },
    attributes: ['Username', 'Phone', 'Email'],
include: [{
    model: Profile,
    attributes: ['profilePicUrl', 'coverPicUr']
}]})
res.status(200).json(user)
    } catch (err: any) {
        console.error('Failed to select user profile', err.message);
        return res.status(500).json({message: 'Failed to select user profile'});
    }
})
export default  router;