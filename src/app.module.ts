import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';
import { CommentModule } from './comment/comment.module';
import { Post } from './post/entities/post.entity';
import { PostService } from './post/post.service';

import { Resource, Database } from '@adminjs/typeorm';
import { AdminModule } from '@adminjs/nestjs'
import AdminJS from 'adminjs';
import { User } from './users/entities/user.entity';

AdminJS.registerAdapter({ Resource, Database });

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

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
    TypeOrmModule.forFeature([Post]),
    PostModule,
    UsersModule,
    LikesModule,
    CommentModule,
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [User, Post],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret'
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret'
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PostService],
})
export class AppModule { }
