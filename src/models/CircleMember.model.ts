import database from "@/config/database";
import { DataTypes, Model } from "sequelize";
import { DataType } from "sequelize-typescript";
import User from "./user.model";
import Circle from "./Circle.model";

class CircleMember extends Model {
    [key: string]: any
}

CircleMember.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    circleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Circle,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    role: {
        type: DataType.ENUM('Admin', 'Member'),
        defaultValue: 'Member'
    },
    status: {
        type: DataType.ENUM('Pending', 'Approved'),
        defaultValue: 'Pending'
    },
},
{
    sequelize: database,
    tableName: 'CircleMember',
    timestamps: true
}
);

export default CircleMember;