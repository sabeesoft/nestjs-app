import { Comment } from "src/comment/entities/comment.entity"
import { Like } from "src/likes/entities/like.entity"
import { User } from "src/users/entities/user.entity"
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({
        length: 60,
        type: "varchar",
    })
    title: string

    @Column({
        length: 256,
        type: "varchar",
    })
    description: string

    @Column({
        type: "datetime",
        default: new Date().toISOString()
    })
    createdAt: string

    @Column({
        type: "datetime",
        nullable: true,
    })
    updatedAt: string

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @OneToMany(() => Like, (like) => like.post)
    likes: Like[]

    @OneToMany(() => Comment, (comments) => comments.post)
    comments: Comment[]
}
