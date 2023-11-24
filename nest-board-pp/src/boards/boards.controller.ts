import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    // 접근 제한자를 생성자 파라미터에 선언하면 
    // 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언이 됨
    // 원래는 스프링처럼 필드에 변수를 선언하고 생성자에서 변수에 주입을 받아야 함
    constructor(private boardService: BoardsService){}

    @Get()
    // 타입을 정해주지 않아도 됨 
    // 하지만 명시적인 효과가 있음
    getAllBoard(): Board[]{
        return this.boardService.getAllboards();
    }

    
    @Post()
    @UsePipes(ValidationPipe) // 유효성 검사, 클래스 단위
    // @Body('title') : http 페이로드안에 title값만 가져옴
    createBoard(@Body() createBoardDto: CreateBoardDto) : Board{
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id') // :id = 쿼리스트링의 id값
    // @Param('id') 쿼리파라미터 id값 가져오기
        // @Param() params: string[] 쿼리파라미터 모든 값 배열로 가져오기
    getBoardById(@Param('id') id:string): Board{
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoardById(@Param('id') id:string): void{
        this.boardService.deleteBoardById(id)
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string, 
        @Body('status', BoardStatusValidationPipe) status:BoardStatus
        ){
        return this.boardService.updateBoardStatus(id,status);
    }
}
