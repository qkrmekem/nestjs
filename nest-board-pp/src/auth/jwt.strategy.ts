import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import {InjectRepository} from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import {Repository} from 'typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
}