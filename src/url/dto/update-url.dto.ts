import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateUrlDto {
    @IsOptional()
    @ApiModelProperty()
    @IsString()
    @Length(3, 100) 
    @IsUrl()
    readonly url: string;
}
