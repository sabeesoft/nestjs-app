import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) { }

  create(createCommentDto: CreateCommentDto) {
    // const comment = this.commentRepository.create(createCommentDto)
    // this.commentRepository.save(comment)

    return 'This action adds a new comment';
  }

  findAll(page: number, size: number) {
    return `This action returns all comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
