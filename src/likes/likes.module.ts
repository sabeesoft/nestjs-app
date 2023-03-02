import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like } from './entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, Post]),
  ],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule { }
