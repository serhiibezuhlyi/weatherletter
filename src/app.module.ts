import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [WeatherModule, SubscriptionModule, DatabaseModule, ScheduleModule.forRoot(), MailingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
