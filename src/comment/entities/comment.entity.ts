import { Post } from "src/post/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({
        type: "varchar",
        length: 500
    })
    content: string

    @Column({
        type: "datetime",
        default: new Date().toISOString()
    })
    createdAt: string

    @ManyToOne(() => User, (user) => user.comments)
    user: User;

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post;
}
