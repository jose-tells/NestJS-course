import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './utils/environments';
import config from './utils/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        environments[String(process.env.NODE_ENV).toLowerCase()] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        MONGO_CONNECTION: Joi.string().required(),
        MONGO_DB_USER: Joi.string().required(),
        MONGO_DB_PASSWORD: Joi.string().required(),
        MONGO_DB_HOST: Joi.string().required(),
        MONGO_DB_PORT: Joi.number().required(),
        MONGO_DB_NAME: Joi.string().required(),
      }),
    }),
    ProductsModule,
    UsersModule,
    DatabaseModule,
  ],
})
export class AppModule {}
