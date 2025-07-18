import User from '@/models/user.model';
import Profile from '@/models/Profile.model';
import Comment from '@/models/Comment.model';


const postIncludes = [{
    model: User,
    as: 'Liker',
    attributes: ['id', 'Username'],
    through: { attributes: [] },
},
{
    model: Comment,
    attributes: ['id', 'content'],
    include: [{
        model: User,
        attributes: ['id', 'Username'],
        include: [{
            model: Profile,
            attributes: ['profilePicUrl']
        }]
    }]

}]

export default postIncludes;