import { Board } from 'src/boards/board.entity';
import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany} from 'typeorm'

@Entity()
@Unique(['username'])
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // 게시물과 관계 형성하기
    @OneToMany(type => Board, board => board.user, {eager: true})
    boards: Board[];
}