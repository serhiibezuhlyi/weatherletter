import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Repository } from 'typeorm';
import { Forecast } from './entities/weather.entity';
import { WEATHER_REPOSITORY } from '../../constants';

@Injectable()
export class WeatherService {
  constructor(
    @Inject(WEATHER_REPOSITORY)
    private weatherRepository: Repository<Forecast>
  ) {}

  async findOne(city: string): Promise<CreateWeatherDto> {
    const entity = await this.weatherRepository.findOne({where: {city}})
    if (!entity) {
      throw new NotFoundException(`Сity: ${city} does not exist`);
    }
    return {
      temperature: entity.temperature,
      humidity: entity.humidity,
      description: entity.description,
    };
  }

  async isCityExists(city: string): Promise<boolean>{
    const entity = await this.weatherRepository.findOne({where: {city}});
    return entity !== null;
  }
}
