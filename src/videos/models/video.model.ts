import { BaseModel, schemaOptions } from '../../common/base/base.model';
import { InstanceType, ModelType, prop } from 'typegoose';

export class Video extends BaseModel<Video> {
    @prop()
    name: string;

    @prop()
    url: string;

    @prop()
    thumbnailUrl: string;

    @prop()
    isPrivate: boolean;

    @prop()
    timesViewed: number;


    static get model(): ModelType<Video> {
        return new Video().getModelForClass(Video, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }

    static createModel(): InstanceType<Video> {
        return new this.model();
    }
}

export const VideoModel = new Video().getModelForClass(Video, { schemaOptions })
