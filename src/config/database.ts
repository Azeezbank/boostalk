// my sql database conection
import { Sequelize } from 'sequelize';
import Dotenv from 'dotenv';

Dotenv.config()

 const database = new Sequelize(
    `${process.env.DB_NAME}`,
    `${process.env.DB_USERNAME}`,
    `${process.env.DB_PASSWORD}`,

    {
        host: `${process.env.DB_HOST}`,
        dialect: 'mysql',
        logging: false,
        
    }

);

export default database;