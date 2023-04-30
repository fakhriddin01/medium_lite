import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {SequelizeModule} from '@nestjs/sequelize'
import { UserModule } from './user/user.module';
import { User } from './user/models/user.model';
import { PostModule } from './post/post.module';
import { Post } from './post/models/post.model';
import { PostRateModule } from './post-rate/post-rate.module';
import { PostRate } from './post-rate/models/post-rate.model';
import { MediaModule } from './media/media.module';
import { Media } from './media/models/media.model';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [User, Post, PostRate, Media],
            autoLoadModels: true,
            logging: false
        }),
        UserModule,
        PostModule,
        PostRateModule,
        MediaModule],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {}
