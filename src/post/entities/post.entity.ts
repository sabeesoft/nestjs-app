import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}
