import { ApiModelProperty } from '@nestjs/swagger';
import { PaginationQuery } from '../../common/pagination/pagination.model';

export class VideoQuery extends PaginationQuery {
    @ApiModelProperty({
        format: 'boolean',
        default: false,
        required: false
    })
    onlyPublic: string;

    @ApiModelProperty({
        format: 'int32',
        default: 0,
        required: false
    })
    viewedMoreThan: string;
}
