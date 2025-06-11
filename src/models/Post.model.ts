// Post table model
// models/Post.ts
import { Model, DataTypes } from 'sequelize';
import database from '../config/database';
import User from './user.model'

export interface PostAttributes {
  id: string;
  title: string;
  content: string;
  userId: string; // Foreign key
}

export class Post extends Model<PostAttributes> {
  [key: string]: any;
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize: database,
    tableName: 'Post',
    timestamps: true,
  }
);

export default Post;