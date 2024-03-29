import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PagedResponse } from 'src/utils/response';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {
  }

  async create(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create({
      ...createPostDto,
      user: {
        id: 1
      }
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

    this.logger.verbose("Get all posts count: " + count)

    return new PagedResponse<Post>(posts, count, pages, page)
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id: id },
      select: {
        user: {
          name: true
        },
        likes: true
      },

      relations: {
        user: true,
        likes: true,
        comments: true
      }
    })

    if (!post) {
      // logging
      throw new NotFoundException(`Post with id = ${id} not found`)
    }

    return post
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

  getAllComments() {
    // SELECT * FROM posts WHERE user_id = 4
    // SELECT * FROM comment WHERE user_id = 4

    // { name: "John", id: 4 ,comments:[{}]}

    return this.postsRepository.find({
      where: {
        id: 4
      },
      select: {
        comments: true
      }
    })
  }

  private async findPostByIdOrFail(id: number) {
    try {
      return this.postsRepository.findOneByOrFail({ id: id })
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(`Post with id = ${id} not found`)
    }
  }
}
