import { Length } from "class-validator"

export class CreatePostDto {
    @Length(8, 60)
    title: string
    @Length(12, 256)
    description: string
}
