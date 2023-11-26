import { Controller, Post, Body, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/authcredential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto){
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }>{
        console.log("signin");
        
        return this.authService.signIn(authCredentialDto);
    }

    @Post('/test')
    // 토큰이 유효한 토큰인지 확인하고, request에 사용자 정보를 담아주는 역할을 함
    @UseGuards(AuthGuard())
    // test(@Req() req){
    test(@GetUser() user:User){
        console.log('user', user);
        
    }
}
