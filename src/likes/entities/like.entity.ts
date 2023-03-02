import { Post } from "src/post/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({
        type: "datetime",
        default: new Date().toISOString()
    })
    createdAt: string

    @ManyToOne(() => User, (user) => user.likes, {
        eager: true,
    })
    user: User;

    @ManyToOne(() => Post, (post) => post.likes)
    post: Post;
}
