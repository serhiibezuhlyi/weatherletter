import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { DatabaseModule } from '../database/database.module';
import { weatherProviders } from './weather.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [WeatherController],
  providers: [...weatherProviders, WeatherService],
})
export class WeatherModule {}
