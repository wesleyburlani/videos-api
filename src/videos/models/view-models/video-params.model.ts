import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator';

export class VideoParams {
    @ApiModelProperty({ required: true, type: String, isArray: false, example: "Crazy Frog" })
    @IsString()
    name: string;

    @ApiModelProperty({ required: true, type: String, isArray: false, example: "https://www.youtube.com/watch?v=k85mRPqvMbE" })
    @IsUrl(undefined, { message: 'url is not valid.' })
    url: string;

    @ApiModelProperty({ required: true, type: String, isArray: false, example: "https://www.youtube.com/watch?v=k85mRPqvMbE" })
    @IsUrl(undefined, { message: 'thumbnailUrl is not valid.' })
    thumbnailUrl: string;

    @ApiModelProperty({ required: true, type: Boolean, isArray: false, example: false })
    @IsBoolean()
    isPrivate: boolean;

    @ApiModelProperty({ required: true, type: Number, isArray: false, example: 1000000 })
    @IsNumber()
    timesViewed: number;
}
