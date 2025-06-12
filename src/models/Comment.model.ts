//Comment table model
import { Model, DataTypes } from "sequelize";
import database from '../config/database';
import User from './user.model';
import Post from './Post.model';

class Comment extends Model {
    [key: string]: any
}

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
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
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        postId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Post,
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
    },
    {
        sequelize: database,
        timestamps: true,
        tableName: 'Comment'
    }
);

export default Comment;