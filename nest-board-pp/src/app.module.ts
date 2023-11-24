import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';

@Module({
  // import해줄 module을 담아주면 됨
  imports: [BoardsModule],
})
export class AppModule {}
