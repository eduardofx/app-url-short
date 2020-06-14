import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
    @ApiModelProperty()
    @IsString()
    @Length(3, 100)
    @IsUrl()
    readonly url: string;
}
