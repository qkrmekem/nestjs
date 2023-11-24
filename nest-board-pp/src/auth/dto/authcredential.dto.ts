import { IsString, Matches, MaxLength, MinLength } from "class-validator";


export class AuthCredentialDto{
    // classVlidation
    @IsString()
    @MinLength(4, {message: '4글자 이상 20글자 이하로 입력해주세요'})
    @MaxLength(20, { message: '4글자 이상 20글자 이하로 입력해주세요' })
    username: string;

    @IsString()
    @MinLength(4, { message: '4글자 이상 20글자 이하로 입력해주세요' })
    @MaxLength(20, { message: '4글자 이상 20글자 이하로 입력해주세요' })
    @Matches(/^[a-zA-Z0-9]*$/,{
        message: '암호는 숫자나 알파벳이 들어가야 합니다.'
    })
    password: string;
}