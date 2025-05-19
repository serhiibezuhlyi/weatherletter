import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { DatabaseModule } from '../database/database.module';
import { weatherProviders } from './weather.providers';
import { DataSource } from 'typeorm';
import { WEATHER_REPOSITORY } from '../../constants';

describe('WeatherService', () => {
  let service: WeatherService;
  const repository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService, {
        provide: WEATHER_REPOSITORY,
        useValue: repository,
      }],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
