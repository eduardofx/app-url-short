import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { urlProviders } from './url.providers';
import { redirectController } from './redirect.controller'

@Module({
    imports: [DatabaseModule],
    controllers: [UrlController,redirectController],
    providers: [UrlService, ...urlProviders],
    exports: [],
})
export class UrlModule {}
