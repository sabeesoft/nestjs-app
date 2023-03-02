import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/db.sql',
      logging: true,
      retryAttempts: 2,
      synchronize: true,
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    PostModule,
    UsersModule,
    LikesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
