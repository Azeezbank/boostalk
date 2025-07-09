import { Model, DataTypes } from 'sequelize';
import database from '@/config/database';
import User from '@/models/user.model';

class Notification extends Model {
    [key: string]: any
}

Notification.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    message: {
    type: DataTypes.TEXT,
    allowNull: false
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},
{
    sequelize: database,
    tableName: 'Notification',
    timestamps: true
}
);

export default Notification;