import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  // import해줄 module을 담아주면 됨
  imports: [
    TypeOrmModule.forRoot(typeORMConfig), // typeorm 설정파일 등록
    BoardsModule, AuthModule
  ],
})
export class AppModule {}
