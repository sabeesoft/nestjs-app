import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { Length, IsOptional } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsOptional()
    @Length(8, 60)
    title: string
    @IsOptional()
    @Length(12, 256)
    description: string
}
