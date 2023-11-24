import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { BoardStatus } from './board-status.enum';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
// import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import {Repository} from 'typeorm'
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository(Board)
        private boardRepository: BoardRepository
    ){}

    creatBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        // repository 패턴 적용 전
        // const {title, description} = createBoardDto;

        // const board = this.boardRepository.create({
        //   title,
        //   description,
        //   status: BoardStatus.PUBLIC  
        // })

        // await this.boardRepository.save(board);
        // return board;
        return this.boardRepository.createBoard(createBoardDto);
    }

    getAllBoards(): Promise<Board[]>{
        return this.boardRepository.getAllBoards();
    }

    getBoardById(id:number): Promise<Board>{
        // const found = await this.boardRepository.findOneBy({id});

        // if(!found){
        //     throw new NotFoundException(`${id} 사용자를 찾을 수 없습니다.`);
        // }

        return this.boardRepository.getBoardById(id);
    }

    updateBoardStatus(id:number, status: BoardStatus): Promise<Board>{
        return this.boardRepository.updateBoardStatus(id, status);
    }

    deleteBoard(id: number): Promise<void> {
        return this.boardRepository.deleteBoard(id);
    }
    /* before typeorm
    private boards: Board[] = [];

    getAllboards(): Board[]{
        return this.boards;
    }
    
    createBoard(createBoardDto: CreateBoardDto){
        // const title = createBoardDto.title;
        // const description = createBoardDto.description;
        // 이거랑 같음
        const {title, description} = createBoardDto;

        const board: Board = {
            id: uuid(), // uuid부여
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id:string): Board{
        // 예외처리
        const found = this.boards.find((board)=> board.id === id);

        if(!found){
            throw new NotFoundException(`${id}를 찾을 수 없습니다`);
        }
        return found
    }

    deleteBoardById(id:string):void{
        const found = this.getBoardById(id);
        this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus):Board{
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
    */
}
