import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { Video } from './models/video.model';
import { ConfigurationService } from '../common/configuration/configuration/configuration.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Video.modelName, schema: Video.model.schema }])],
  controllers: [VideosController],
  providers: [VideosService,  ConfigurationService],
})
export class VideosModule {}
