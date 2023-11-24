import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
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
}
