import User from './user.model';
import Post from './Post.model'

// One-to-many: A User has many Posts
User.hasMany(Post, {
  foreignKey: 'userId',
  as: 'posts',
  onDelete: 'CASCADE',
});

// Each Post belongs to a User
Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'author',
});