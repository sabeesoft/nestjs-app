import { Injectable, NotFoundException } from '@nestjs/common';
import { PagedResponse } from 'src/utils/response';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {
  }

  async create(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create({
      ...createPostDto,
    });

    const savedPost = await this.postsRepository.save(post)
    return savedPost;
  }

  async findAll(q: string, page: number, size: number) {
    const skip = size * page

    const [posts, count] = await this.postsRepository.findAndCount({
      skip: skip,
      take: size,
      where: {
        title: q || undefined,
      },
    });

    const pages = Math.ceil(count / size);

    return new PagedResponse<Post>(posts, count, pages, page)
  }

  async findOne(id: number) {
    return this.findPostByIdOrFail(id)
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.findPostByIdOrFail(id)
    return this.postsRepository.save({
      id: id,
      ...post,
      ...updatePostDto,
      updatedAt: new Date().toISOString(),
    });

  }

  async remove(id: number) {
    const post = await this.findPostByIdOrFail(id)
    await this.postsRepository.delete({ id: post.id })
    return post
  }

  private async findPostByIdOrFail(id: number) {
    try {
      return this.postsRepository.findOneByOrFail({ id: id })
    } catch (error) {
      console.warn(error);
      throw new NotFoundException(`Post with id = ${id} not found`)
    }
  }
}
