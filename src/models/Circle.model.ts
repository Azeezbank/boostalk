import { Model, DataTypes } from 'sequelize';
import database from '@/config/database';
import User from './user.model';
class Circle extends Model {
    [key: string]: any
}

Circle.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
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
    profile_Pics: {
        type: DataTypes.STRING,
        allowNull: true
    },
    circle_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
},
{
        sequelize: database,
        tableName: 'Circle',
        timestamps: true
    }
);

export default Circle;