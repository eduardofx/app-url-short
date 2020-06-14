import {
    Controller,
    Req,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
} from '@nestjs/common';
import {
    ApiUseTags,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiImplicitParam,
} from '@nestjs/swagger';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlService } from './url.service';
import { AuthGuard } from '@nestjs/passport';
import { Url as UrlEntity} from './url.entity';
import { UrlDto } from './dto/url.dto';
import { Request } from 'express';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('url')
@ApiUseTags('url')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    @Get()
    @ApiOkResponse({ type: [UrlDto] })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    findAll(@Req() request): Promise<UrlDto[]> {
        return this.urlService.findAll(request.user.id);
    }

    @Get(':id')
    @ApiOkResponse({ type: UrlDto })
    @ApiImplicitParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<UrlDto> {
        return this.urlService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: UrlEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createCategorytDto: CreateUrlDto,
        @Req() request,
    ): Promise<UrlEntity> {
        return this.urlService.create(request.user.id, createCategorytDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: UrlEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Req() request,
        @Body() updateUrlDto: UpdateUrlDto,
    ): Promise<UrlEntity> {
        return this.urlService.update(id, request.user.id, updateUrlDto);
    }
 

    @Delete(':id')
    @ApiOkResponse({ type: UrlEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(
        @Param('id', new ParseIntPipe()) id: number,
        @Req() request,
    ): Promise<UrlEntity> {
        return this.urlService.delete(id, request.user.id);
    }
}
