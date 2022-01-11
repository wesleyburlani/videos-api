import { BaseModelVm } from '../../../common/base/base.model.vm';
import { ApiModelProperty } from '@nestjs/swagger';

export class VideoVm extends BaseModelVm {
    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    url: string;

    @ApiModelProperty()
    thumbnailUrl: string;

    @ApiModelProperty()
    isPrivate: boolean;

    @ApiModelProperty()
    timesViewed: number;
}
