import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class LikesService {

  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {
  }

  async create(createLikeDto: CreateLikeDto) {
    const { postId, userId } = createLikeDto
    try {
      const post = await this.postsRepository.findOneByOrFail({ id: postId })
      const like = this.likeRepository.create({
        post: post,
        user: {
          id: userId
        }
      })
      return this.likeRepository.save(like)
    } catch (error) {
      console.warn(error);
      throw new NotFoundException(`Post with id = ${postId} not found`)
    }
  }

  findAll() {
    return this.likeRepository.find()
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
