import User from './user.model';
import Post from './Post.model';
import Comment from './Comment.model';
import Likes from '@/models/Likes.model';

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
})