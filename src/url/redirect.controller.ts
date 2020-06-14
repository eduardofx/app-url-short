import {
    Controller,
    Get,
    Param,
    Res,
} from '@nestjs/common';
import {
    ApiUseTags
} from '@nestjs/swagger';
import { UrlService } from './url.service';
@Controller('')
@ApiUseTags('')
export class redirectController {
    constructor(private readonly urlService: UrlService) {}

    @Get() 
    findAll():Object{
        return { response: 'API', status:200 };
    }

    @Get(':data')
    async findOne(@Param() params,@Res() response) {
      const url = await this.urlService.findByHash(params.data);
      response.redirect(url.url)
    }
}
