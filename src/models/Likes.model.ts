//Likes table model goes her
import { Model, DataTypes }  from 'sequelize';
import User from './user.model';
import Post from './Post.model';
import database from '@/config/database';


class Likes extends Model {
    [key: string]: any
}
Likes.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Post,
                key: 'id'
            }
        }
    },
    {
        sequelize: database,
        tableName: 'Likes',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'postId'] //Prevent duplicate likes
            },
        ],
    }
);

export default Likes;