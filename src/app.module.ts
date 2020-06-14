import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { UrlModule } from './url/url.module'
import { ConfigModule } from '@nestjs/config';


ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
})

@Module({
    imports: [ConfigModule.forRoot(),UsersModule,UrlModule,SharedModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
