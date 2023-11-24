import {BaseEntity, PrimaryGeneratedColumn, Column, Entity} from 'typeorm'
import { BoardStatus } from './board-status.enum';

@Entity()
// export class Board extends BaseEntity{
export class Board{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;
}