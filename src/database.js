import {Sequelize} from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const name = process.env.DB_NAME;
const port = process.env.DB_PORT;

const url = `postgres://${user}:${password}@${host}:${port}/${name}`;
export const database = new Sequelize(url, {
    dialect: 'postgres',
    logging: false,
});

export const init = async () => {
    await database.authenticate();
    await database.sync({alter: true,});
    console.log('Connection has been established successfully.');
}
