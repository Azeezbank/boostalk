import User from './user.model';
import Post from './Post.model';
import Comment from './Comment.model';
import Likes from '@/models/Likes.model';
import Follow from './Follow.model';
import Messages from './Messages.model';
import Profile from './Profile.model';
import circleMember from './CircleMember.model';
import circle from './Circle.model';
import Notification from './Notification.model';

//User => Post
// One-to-many: A User has many Posts
User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

// Each Post belongs to a User
Post.belongsTo(User, {
  foreignKey: 'userId',
});

//Post => comment
//one to many: A post has many comments
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});

//Each comment belongs to a post
Comment.belongsTo(Post, {
  foreignKey: 'postId',
});

//User => comment
// A user has manny comment
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

//Each comment belongd to a user
Comment.belongsTo(User, {
  foreignKey: 'userId'
});

//User => Post => Likes
//A user can like many post
User.belongsToMany(Post, {
  through: Likes,
  foreignKey: 'userId',
  as: 'LikedPost'
});

//A post can be liked by many user
Post.belongsToMany(User, {
  through: Likes,
  foreignKey: 'postId',
  as: 'Liker'
});

//A user can follow many users
//Followers
User.belongsToMany(User, {
  through: Follow,
  as: 'Followers',
  foreignKey: 'followingId',
  otherKey: 'followerId'
});

//Following
User.belongsToMany(User, {
  through: Follow,
  as: 'following',
  foreignKey: 'followerId',
  otherKey: 'followingId'
});

//User and messages relationship
User.hasMany(Messages, { foreignKey: 'senderId', as: 'SentMessages' });
User.hasMany(Messages, { foreignKey: 'receiverId', as: 'ReceivedMessages' });

Messages.belongsTo(User, { foreignKey: 'senderId', as: 'Sender' });
Messages.belongsTo(User, { foreignKey: 'receiverId', as: 'Receiver' });

//a user has one profile, and a profile has a user
//One-to-one relationship
User.hasOne(Profile, {
  foreignKey: 'userId', onDelete: 'CASCADE',
});
Profile.belongsTo(User, {
  foreignKey: 'userId',
})

// Circle, CircleMember, post and user relationship
User.hasMany(circle, {foreignKey: 'userId'});
circle.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(circleMember, {foreignKey: 'userId'});
circleMember.belongsTo(User, { foreignKey: 'userId'});
circle.hasMany(circleMember, {foreignKey: 'circleId'});
circleMember.belongsTo(circle, { foreignKey: 'circleId' });
Post.belongsTo(circle, { foreignKey: 'circleId' });
circle.hasMany(Post, { foreignKey: 'circleId' });


//Notification model association
Notification.belongsTo(User, {
  foreignKey: 'senderId',
  as: 'Sender'
});
User.hasMany(Notification, {
  foreignKey: 'senderId',
  as: 'Sender'
});

Notification.belongsTo(User, {
  foreignKey: 'receiverId',
  as: 'Receiver'
});
User.hasMany(Notification, {
  foreignKey: 'receiverId',
  as: 'Receiver'
});