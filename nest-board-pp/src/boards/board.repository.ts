import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { log } from 'console';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository{
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>
    ){}
    
    async createBoard(createBoardDto: CreateBoardDto, user:User): Promise<Board>{
        const{title, description} =createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        await this.boardRepository.save(board);
        return board;
    }

    async getAllBoards(user: User): Promise<Board[]>{
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', {userId: user.id});

        const boards = await query.getMany();
        return boards;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOneBy({ id });

        if (!found) {
            throw new NotFoundException(`${id} 사용자를 찾을 수 없습니다.`);
        }

        return found;
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board>{
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({id, user});

        if (result.affected === 0) {
            throw new NotFoundException(`${id} 사용자를 찾을 수 없습니다.`)
        }

        console.log('result', result);

    }

}