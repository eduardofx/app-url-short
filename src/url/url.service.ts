import { User } from '../users/user.entity';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url } from './url.entity';
import { UrlDto } from './dto/url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { customAlphabet } from 'nanoid'
import { AlphaNum } from '../shared/enum/alphanum'
import { ConfigService } from './../shared/config/config.service';
import { Sequelize } from 'sequelize-typescript'

@Injectable()
export class UrlService {
    constructor(
        @Inject('UrlRepository')
        private readonly urlRepository: typeof Url,
        private readonly configService: ConfigService
    ) {}

    async findAll(userId: string): Promise<UrlDto[]> {
    
        const url = await this.urlRepository.findAll<Url>({
            include: [User],
            where: {
                userId: userId,
                createdAt: {
                    [Sequelize.Op.lt]: new Date(),
                    [Sequelize.Op.gt]: new Date().setDate(new Date().getDate() - 3)
                }
            }
        });
        return url.map(url => {
          url.newurl = this.configService.defaultUrl+url.newurl
          return new UrlDto(url);
        })
    }

    async findOne(id: number): Promise<UrlDto> {
        const url = await this.urlRepository.findOne({
            where: {
              id: id,
              createdAt: {
                [Sequelize.Op.lt]: new Date(),
                [Sequelize.Op.gt]: new Date().setDate(new Date().getDate() - 3)
              }
            },
        })
        
        url.newurl = this.configService.defaultUrl+url.newurl
        if (!url) {
            throw new HttpException('No url found', HttpStatus.NOT_FOUND);
        }

        return new UrlDto(url);
    }

    async findByHash(hash: string): Promise<UrlDto> {
        const url = await this.urlRepository.findOne<Url>({
            where: {
                newurl: hash,
                createdAt: {
                    [Sequelize.Op.lt]: new Date(),
                    [Sequelize.Op.gt]: new Date().setDate(new Date().getDate() - 3)
                }
            }
        });
        
        if (!url) {
            throw new HttpException('No url found', HttpStatus.NOT_FOUND);
        }
        url.newurl = this.configService.defaultUrl+url.newurl

        return new UrlDto(url);
    }

    async create(userId: string, createUrlDto: CreateUrlDto): Promise<Url> {
        const url = new Url();
        url.userId = userId;
        url.url = createUrlDto.url;
        url.newurl = customAlphabet(AlphaNum.data, 10)()
        try {
            const savedUrl = await url.save()
            savedUrl.newurl = this.configService.defaultUrl+url.newurl
            return savedUrl;
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    
    private async getUserUrl(id: number, userId: string): Promise<Url> {
        const url = await this.urlRepository.findOne<Url>({
            where: {
                id: id,
                createdAt: {
                    [Sequelize.Op.lt]: new Date(),
                    [Sequelize.Op.gt]: new Date().setDate(new Date().getDate() - 3)
                }
            }
        });
        if (!url)  throw new HttpException('No wallet found', HttpStatus.NOT_FOUND);   

        if (url.userId !== userId) {
            throw new HttpException(
                'Sem autorização',
                HttpStatus.UNAUTHORIZED,
            );
        }

        return url;
    }

    async update(
        id: number,
        userId: string,
        updateUrlDto: UpdateUrlDto,
    ): Promise<Url> { ;
        const url = await this.getUserUrl(id, userId);
        url.url = updateUrlDto.url || url.url;
        url.newurl = this.configService.defaultUrl+url.newurl
        try {
            return await url.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number, userId: string): Promise<Url> {
        const url = await this.getUserUrl(id, userId);
        await url.destroy();
        return url;
    }

}
