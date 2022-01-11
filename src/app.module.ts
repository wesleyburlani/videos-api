import { Module } from '@nestjs/common';
import { VideosModule } from './videos/videos.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationService } from './common/configuration/configuration/configuration.service';
import { Configuration } from './common/configuration/configuration/configuration.enum';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { AuthService } from './common/auth/auth.service';
import { AuthModule } from './common/auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [CommonModule, AuthModule, MongooseModule.forRootAsync({
    imports: [CommonModule],
    useFactory: async (_configService: ConfigurationService) => ({
      uri: _configService.get(Configuration.MONGO_URI),
      useFindAndModify: false,
    }),
    inject: [ConfigurationService],
  }), VideosModule, UsersModule, HealthModule],
  providers: [AuthService, UsersService]
})
export class AppModule {}
