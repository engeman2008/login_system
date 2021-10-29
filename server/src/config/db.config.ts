import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  HOST: process.env.DB_HOST as string,
  USER: process.env.DB_USER as string,
  PASSWORD: process.env.DB_PASS as string,
  DB: process.env.DB_NAME as string,
  dialect: process.env.DIALECT as string,
};
export default dbConfig;
