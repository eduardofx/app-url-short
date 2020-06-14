import { ApiModelProperty } from '@nestjs/swagger';
import { Url } from '../url.entity';

export class UrlDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly url: string;

    @ApiModelProperty()
    readonly newurl: string;

    @ApiModelProperty()
    readonly createdAt: Date;

    @ApiModelProperty()
    readonly updatedAt: Date;

    constructor(url: Url) {
        this.id = url.id;
        this.url = url.url;
        this.newurl = url.newurl
        this.createdAt = url.createdAt;
        this.updatedAt = url.updatedAt;
    }
}
