import { IsNotEmpty } from "class-validator";

export class CreateBoardDto{
    // pipe 데코레이터
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}