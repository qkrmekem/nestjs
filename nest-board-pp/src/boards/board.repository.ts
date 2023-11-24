import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { log } from 'console';

@Injectable()
export class BoardRepository{
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>
    ){}
    
    async createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        const{title, description} =createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board);
        return board;
    }

    async getAllBoards(): Promise<Board[]>{
        return this.boardRepository.find();
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

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`${id} 사용자를 찾을 수 없습니다.`)
        }

        console.log('result', result);

    }

}