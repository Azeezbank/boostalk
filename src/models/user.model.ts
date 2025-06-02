// database user model
import { Model, DataTypes } from 'sequelize';
import  database  from '../config/database';


export enum Role {
    ADMIN = "admin",
    USER = "user",
}

export interface UserAttributes {
    id: string;
    Username?: string;
    Email?: string;
    FullName?: string;
    Password?: string;
    address?: string;
    Role?: string;
    Phone?: string;
    verificationCode: string;
    isVerified: boolean;
    // email_verified_at?: Date | null;
}

export class User extends Model<UserAttributes> {
    [x:string] : any
}

User.init(

{
    id: {
        type:DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    }, 
    FullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Username: {
        type: DataTypes.STRING,
        allowNull:false,

    },
    Phone: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    Role: {
      type: DataTypes.ENUM(...Object.values(Role)),
      allowNull: false,
      defaultValue: "user",
    },
    Email:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    Password:{
        type:DataTypes.STRING,
        allowNull: false
    },
    verificationCode: {
    type: DataTypes.STRING,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
},
{
    sequelize: database,
    tableName: "User",
    timestamps: true,
}

);

export default User;