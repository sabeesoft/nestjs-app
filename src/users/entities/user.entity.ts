import { Like } from "src/likes/entities/like.entity"
import { Post } from "src/post/entities/post.entity"
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({
        type: "varchar",
        length: 40
    })
    name: string

    @Column({
        type: "varchar",
        length: 120
    })
    email: string

    @Column({
        type: "varchar",
        length: 36
    })
    password: string

    @Column({
        type: "boolean",
        default: false
    })
    confirmed: boolean

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

    @OneToMany(() => Post, (posts) => posts.user)
    posts: Post[]

    @OneToMany(() => Like, (likes) => likes.user)
    likes: Like[]
}
