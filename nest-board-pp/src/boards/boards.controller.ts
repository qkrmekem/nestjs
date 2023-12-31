import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe, UseGuards, Logger } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { log } from 'console';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard()) // 컨트롤러 레벨로 가드 적용
export class BoardsController {
    private logger = new Logger('BoardsController');
    // 접근 제한자를 생성자 파라미터에 선언하면 
    // 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언이 됨
    // 원래는 스프링처럼 필드에 변수를 선언하고 생성자에서 변수에 주입을 받아야 함
    constructor(private boardService: BoardsService){}

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoard: CreateBoardDto,
        @GetUser() user: User) : Promise<Board>{
        // console.log("createBoard");
        this.logger.verbose(`User ${user.username} creating a new board.
        payload: ${JSON.stringify(createBoard)}`)
        return this.boardService.creatBoard(createBoard,user);
    }

    @Get()
    getAllBoards(
        @GetUser() user: User
    ): Promise<Board[]>{
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardService.getAllBoards(user);
    }

    @Get('/id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id')id:number, 
        @Body('status', BoardStatusValidationPipe)status:BoardStatus): Promise<Board>{
        return this.boardService.updateBoardStatus(id, status);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: number, @GetUser() user:User): Promise<void> {
        return this.boardService.deleteBoard(id, user);
    }

    /* before typeorm
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

    */
}
