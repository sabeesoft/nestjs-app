import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  // http://localhost:8080/comment -> JSON Body {content}
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  // http://localhost:8080/comment/post/123 -> comments[]
  @Get("post/:postId")
  findAll(@Query('page', new DefaultValuePipe("0"), ParseIntPipe) page: number, @Query('size', new DefaultValuePipe("10"), ParseIntPipe) size: number) {
    return this.commentService.findAll(page, size);
  }
  // http://localhost:8080/comment/123 -> JSON Body {content}
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }
  // http://localhost:8080/comment/123
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
