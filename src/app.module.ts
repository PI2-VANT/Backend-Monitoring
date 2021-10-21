import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
<<<<<<< HEAD
import * as redisStore from 'cache-manager-redis-store';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      port: 6379,
      db: '0',
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
=======

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' })
>>>>>>> 43c7c6816c82f793ac6e6bd50c44e95cabb8d1ae
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
