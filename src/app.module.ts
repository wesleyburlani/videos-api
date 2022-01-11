import { Module } from '@nestjs/common';
import { VideosModule } from './videos/videos.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationService } from './common/configuration/configuration/configuration.service';
import { Configuration } from './common/configuration/configuration/configuration.enum';
import { HealthModule } from './health/health.module';

@Module({
  imports: [CommonModule, MongooseModule.forRootAsync({
    imports: [CommonModule],
    useFactory: async (_configService: ConfigurationService) => ({
      uri: _configService.get(Configuration.MONGO_URI),
      useFindAndModify: false,
    }),
    inject: [ConfigurationService],
  }), VideosModule, HealthModule],
  providers: []
})
export class AppModule {}
