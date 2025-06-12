//Likes table model goes her
import { Model, DataTypes }  from 'sequelize';
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
            allowNull: false
        },
        postId: {
            type: DataTypes.UUID,
            allowNull: false
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