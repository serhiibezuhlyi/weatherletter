import { Inject, Injectable } from '@nestjs/common';
import { SUBSCRIPTION_REPOSITORY } from '../../constants';
import { Repository } from 'typeorm';
import { Subscribers } from '../subscription/entities/subscription.entity';
import { Cron } from '@nestjs/schedule';
import { MailingDTO } from './dto/mailing-dto';

@Injectable()
export class MailingService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: Repository<Subscribers>
  ) {
  }

  @Cron('0 0 * * *')
  async removeUnverified() {
    const entities = await this.subscriptionRepository.find({where: {is_verified: false}});
    await this.subscriptionRepository.remove(entities);
  }

  @Cron('0 * * * *')
  async hourlyMailing(){

    const entities = await this.getData('hourly');
    entities.map((entity) => {
      this.sendMail(this.transformData(entity))
    })

  }

  @Cron('0 12 * * *')
  async dailyMailing(){

    const entities = await this.getData('daily');
    entities.map((entity) => {
      this.sendMail(this.transformData(entity))
    })

  }

  async getData(frequency: string) {

    return await this.subscriptionRepository.find({
      where: {frequency: frequency, is_verified: true},
      relations: ['forecast'],
    })

  }

  transformData(subscriber: Subscribers): MailingDTO {
    return {
      email: subscriber.email,
      city: subscriber.city,
      temperature: subscriber.forecast?.temperature ?? 0,
      humidity: subscriber.forecast?.humidity ?? 0,
      description: subscriber.forecast?.description ?? 'empty',
    }
  }

  async sendMail(data: MailingDTO) {
    console.log(data)
    //some logic
  }

}
