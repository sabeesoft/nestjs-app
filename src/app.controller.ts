import { Controller, Get, Render } from '@nestjs/common';
import { PostService } from './post/post.service';

@Controller()
export class AppController {

  constructor(private readonly postService: PostService) { }

  @Get('/about')
  @Render('about')
  async about() {

    return {
      meta: {
        description: "Test nest app",
        title: "Page - About",
        keywords: "uznu edu",
        author: "uznu",
      },
    };
  }

  @Get()
  @Render('index')
  async root() {

    const posts = await this.postService.findAll("", 0, 10)

    return {
      meta: {
        description: "Test nest app",
        title: "Page - Index",
        keywords: "uznu edu",
        author: "uznu",
      },
      posts
    };
  }
}

