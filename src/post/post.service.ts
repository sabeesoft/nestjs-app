import { Injectable, NotFoundException } from '@nestjs/common';
import { PagedResponse } from 'src/utils/response';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  private posts = new Map<number, Post>()

  constructor() {

    for (let index = 0; index < 100; index++) {

      const _id = Math.random()

      const _post: Post = {
        description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you`,
        createdAt: new Date().toISOString(),
        title: `Post ${_id}`,
        id: _id
      }

      this.posts.set(_id, _post)
    }
  }

  create(createPostDto: CreatePostDto) {
    const post: Post = {
      description: createPostDto.description,
      createdAt: new Date().toISOString(),
      title: createPostDto.title,
      id: Math.random()
    }

    this.posts.set(post.id, post)
  }

  findAll(q: string, page: number, size: number) {
    const _posts = Array.from(this.posts.values())
    const postItemsCount = _posts.length;
    const startIndex = size * page
    const pagesCount = Math.ceil(postItemsCount / size)
    const response = new PagedResponse<Post>(_posts.filter(post => post.title.includes(q)).splice(startIndex, size), postItemsCount, pagesCount, page)
    return response
  }

  findOne(id: number) {
    return this.findPostByIdOrFail(id)
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.findPostByIdOrFail(id)
    const updatedPost = { ...post, ...updatePostDto }
    this.posts.set(id, updatedPost)
    return updatedPost
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
