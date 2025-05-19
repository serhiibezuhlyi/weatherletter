import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { subscriptionProviders } from '../subscription/subscription.providers';
import { weatherProviders } from '../weather/weather.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [MailingService, ...subscriptionProviders, ...weatherProviders],
})
export class MailingModule {}
