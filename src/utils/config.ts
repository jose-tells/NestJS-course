import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    dbPort: process.env.DATABASE_PORT,
  },
  mongo: {
    connection: process.env.MONGO_CONNECTION,
    user: process.env.MONGO_DB_USER,
    password: process.env.MONGO_DB_PASSWORD,
    host: process.env.MONGO_DB_HOST,
    port: process.env.MONGO_DB_PORT,
    dbName: process.env.MONGO_DB_NAME,
  },
  apiKey: process.env.API_KEY,
}));
