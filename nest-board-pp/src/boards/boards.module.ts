import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
// import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]) // 리포지토리 등록
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository]
})
export class BoardsModule {}
