import { DataSource } from 'typeorm';
import { Forecast } from './entities/weather.entity';
import { DATA_SOURCE, WEATHER_REPOSITORY } from '../../constants';


export const weatherProviders = [
  {
    provide: WEATHER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Forecast),
    inject: [DATA_SOURCE]
  }
]