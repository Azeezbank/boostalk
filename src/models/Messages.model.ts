import { DataTypes, Model } from "sequelize";
import database from "@/config/database";

export class Messages extends Model {
    [key: string]: any
}

Messages.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    receiverId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
     isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
},
{
        sequelize: database,
        tableName: 'Messages',
        timestamps: true
    }
)

export default Messages;