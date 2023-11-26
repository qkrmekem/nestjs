import {ConflictException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { User } from './user.entity'
import { AuthCredentialDto } from './dto/authcredential.dto'
import * as bcrypt from 'bcrypt'
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
        private jwtService: JwtService
    ){}

    async createUser(authCredentialDto: AuthCredentialDto): Promise<void>{
        const{username,password} = authCredentialDto;

        // 암호화 로직
        const salt = await bcrypt.genSalt(); // salt 생성
        const hashedPassword = await bcrypt.hash(password, salt); // hash암호 생성

        const user = this.userRepository.create({username, password: hashedPassword});

        try {
            await this.userRepository.save(user);    
        } catch (error) {
            if(error.code === '23505'){
                throw new ConflictException('이미 존재하는 id입니다.');
            }else{
                throw new InternalServerErrorException();
            }
        }
        
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOneBy({username});

        // 입력받은 password와 db에 저장된 password를 비교하여 일치한지 체크
        if(user && (await bcrypt.compare(password, user.password))){
            
            // 유저 토큰 생성 (secret + payload)
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        }else{
            throw new UnauthorizedException('login Falid');
        }
    }


}