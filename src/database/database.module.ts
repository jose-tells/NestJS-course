import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

import { Module, Global } from '@nestjs/common';
import config from '../utils/config';

const API_KEY = '12356778';
const API_KEY_PROD = 'PROD134235';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, host, port, user, password, dbName } =
          configService.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;

        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected successfully to the server');
        const db = client.db(dbName);

        return db;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
