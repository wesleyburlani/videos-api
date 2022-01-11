import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { BaseService } from 'src/common/base/base.service';
import { Video, VideoModel } from './models/video.model';
import { MapperService } from 'src/common/mapper/mapper/mapper.service';
import { VideoParams } from './models/view-models/video-params.model';

@Injectable()
export class VideosService extends BaseService<Video> {
    constructor(
        @InjectModel(Video.modelName) private readonly _orderModel: ModelType<Video>,
        private readonly _mapperService: MapperService,
    ) {
        super();
        this._model = _orderModel;
        this._mapper = _mapperService.mapper;
    }

    async getVideos(
        page: number, 
        limit: number, 
        onlyPublic: boolean = false, 
        viewedMoreThan: number = -1
    ): Promise<Video[]> {
        try {
            let query: any = {
                timesViewed: { $gt: viewedMoreThan }
            };
            if(onlyPublic) {
                query.isPrivate = false;
            }
        
            const videos = await this.find(query, page, limit);
            return videos.map(v => v.toJSON());
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async getVideo(id: string): Promise<Video> {
        try {
            const result = await this.findById(id);
            if(result === null) {
                throw new NotFoundException();
            }
            return result.toJSON();
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async createVideo(params: VideoParams): Promise<Video> {
        const video = new VideoModel();

        video.name = params.name;
        video.url = params.url;
        video.thumbnailUrl = params.thumbnailUrl;
        video.isPrivate = params.isPrivate;
        video.timesViewed = params.timesViewed;

        try {
            const result = await this.create(video);
            return result.toJSON() as Video;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async updateVideo(id: string, params: VideoParams): Promise<Video> {
        try {
            const result = await this._model.findByIdAndUpdate(this.toObjectId(id), params, { new: true }).exec();

            if(result === null) {
                throw new NotFoundException();
            }

            return result.toJSON() as Video;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }


    async deleteVideo(id: string): Promise<Video> {
        try {
            const result = await this.delete(id);

            if(result === null) {
                throw new NotFoundException();
            }

            return result.toJSON() as Video;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
