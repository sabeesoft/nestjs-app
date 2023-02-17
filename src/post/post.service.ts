import { Injectable, NotFoundException } from '@nestjs/common';
import { PagedResponse } from 'src/utils/response';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  private posts = new Map<number, Post>()

  create(createPostDto: CreatePostDto) {

    const post: Post = {
      description: createPostDto.description,
      createdAt: new Date().toISOString(),
      title: createPostDto.title,
      id: Math.random()
    }

    this.posts.set(post.id, post)
  }

  findAll() {
    const _posts = Array.from(this.posts.values())
    const response = new PagedResponse<Post>(_posts, _posts.length, 1, 1)
    return response
  }

  findOne(id: number) {
    return this.findPostByIdOrFail(id)
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.findPostByIdOrFail(id)
    const updatedPost = { ...post, ...updatePostDto }
    this.posts.set(id, updatedPost)
    return updatePostDto
  }

  remove(id: number) {
    const post = this.findPostByIdOrFail(id)
    this.posts.delete(id)
    return post
  }

  private findPostByIdOrFail(id: number) {
    const post = this.posts.get(id);
    if (!post) {
      throw new NotFoundException(`Post with id = ${id} not found`)
    }
    return post
  }
}
