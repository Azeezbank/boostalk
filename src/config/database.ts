// my sql database conection
import { Sequelize } from 'sequelize';
import Dotenv from 'dotenv';

Dotenv.config()

console.log('Connecting to database...', process.env.DB_HOST);
 const database = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,

    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
        
    }

);

export default database;