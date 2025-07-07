import { DataTypes, Model } from 'sequelize';
import database from '@/config/database';

export class Follow extends Model {
    public followerId!: string;
    public followingId!: string;
}

Follow.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },

    followerId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    followingId: {
        type: DataTypes.UUID,
        allowNull: false
    },
},
    {
        sequelize: database,
        modelName: 'Follow',
        tableName: 'follows',
        timestamps: true,
        indexes: [{
            unique: true,
            fields: ['followerId', 'followingId']
        }]
    }
);

export default Follow;