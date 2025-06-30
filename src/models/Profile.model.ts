import database from '../config/database';
import { DataTypes, Model } from 'sequelize';

export class Profile extends Model {
    [key: string]: any
}

Profile.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    profilePicUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    coverPicUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    }
},
    {
        sequelize: database,
        timestamps: true,
        tableName: 'Profile'
    }
);

export default Profile;