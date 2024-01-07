import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config'; // 설정 파일 import

// 설정파일에서 db키값만 가져옴
const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions ={
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT|| dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'], // 엔티티 등록
    synchronize: dbConfig.synchronize
}