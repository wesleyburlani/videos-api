import { ApiModelProperty } from '@nestjs/swagger';
import { PaginationQuery } from '../../common/pagination/pagination.model';

export class VideoQuery extends PaginationQuery {
    @ApiModelProperty({
        format: 'boolean',
        default: false,
        required: false,
        description: "If true, will retrieve only public videos",
    })
    onlyPublic: string;

    @ApiModelProperty({
        format: 'int32',
        default: 0,
        required: false,
        description: "will retrieve only videos that were viewed more times than the number passed",
    })
    viewedMoreThan: string;
}
