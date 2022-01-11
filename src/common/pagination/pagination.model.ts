import { ApiModelProperty } from '@nestjs/swagger';

export class PaginationQuery {
  @ApiModelProperty({
    minimum: 0,
    maximum: 10000,
    format: 'int32',
    default: 0,
    required: false,
  })
  page: string;

  @ApiModelProperty({
      format: 'int32',
      default: 10,
      required: false
  })
  limit: string;
}
