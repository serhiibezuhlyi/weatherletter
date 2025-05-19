import { DataSource } from 'typeorm';
import { Subscribers } from './entities/subscription.entity';
import { DATA_SOURCE, SUBSCRIPTION_REPOSITORY } from '../../constants';


export const subscriptionProviders = [
  {
    provide: SUBSCRIPTION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Subscribers),
    inject: [DATA_SOURCE],
  }
]