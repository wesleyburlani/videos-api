import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOkResponse, ApiBadRequestResponse,
    ApiOperation, 
    ApiCreatedResponse} from '@nestjs/swagger';
import { Video } from './models/video.model';
import { VideosService } from './videos.service';
import { GetOperationId } from 'src/common/helpers/get-operation-id.helper';
import { AuthGuard } from '@nestjs/passport';
import { ConfigurationService } from 'src/common/configuration/configuration/configuration.service';
import { VideoVm } from './models/view-models/video-vm.model';
import { VideoParams } from './models/view-models/video-params.model';
import { PaginationQuery } from 'src/common/pagination/pagination.model';
import { VideoQuery } from './models/video.query.model';

@Controller('videos')
@ApiUseTags(Video.modelName)
export class VideosController {
    constructor(private readonly _videosService: VideosService,
                private readonly _configService: ConfigurationService,
    ) {}

    @Get()
    @ApiOkResponse({ type: [VideoVm] })
    @ApiBadRequestResponse({})
    @ApiOperation(GetOperationId(Video.modelName, 'Get'))
    async getAll(@Query() query: VideoQuery): Promise<VideoVm[]> {
        const page = parseInt(query.page) || 0;
        const limit =  parseInt(query.limit) || 10;
        const onlyPublic = (query.onlyPublic || "").toLowerCase() === "true";
        const viewedMoreThan = parseInt(query.viewedMoreThan) || -1;
        const videos = await this._videosService.getVideos(page, limit, onlyPublic, viewedMoreThan);
        const vms: VideoVm[] = [];
        for(const video of videos){
            vms.push(await this._videosService.map<VideoVm>(video));
        }
        return vms;
    }

    @Get(':id')
    @ApiOkResponse({ type: VideoVm })
    @ApiBadRequestResponse({})
    @ApiOperation(GetOperationId(Video.modelName, 'Get'))
    async get(@Param('id') id: string): Promise<VideoVm> {
        return await this._videosService.getVideo(id)
    }
    
    @Post()
    @ApiCreatedResponse({ type: VideoVm })
    @ApiBadRequestResponse({})
    @ApiOperation(GetOperationId(Video.modelName, 'Create'))
    async create(@Req() req, @Body() params: VideoParams): Promise<VideoVm> {
        const video = await this._videosService.createVideo(params);
        return this._videosService.map<VideoVm>(video);
    }

    @Put(':id')
    @ApiCreatedResponse({ type: VideoVm })
    @ApiBadRequestResponse({})
    @ApiOperation(GetOperationId(Video.modelName, 'Update'))
    async update(@Param('id') id: string, @Body() params: VideoParams): Promise<VideoVm> {
        const video = await this._videosService.updateVideo(id, params);
        return this._videosService.map<VideoVm>(video);
    }

    @Delete(':id')
    @ApiCreatedResponse({ type: VideoVm })
    @ApiBadRequestResponse({})
    @ApiOperation(GetOperationId(Video.modelName, 'Delete'))
    async delete(@Param('id') id: string): Promise<VideoVm> {
        const video = await this._videosService.deleteVideo(id);
        return this._videosService.map<VideoVm>(video);
    }
}
