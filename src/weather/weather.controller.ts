import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('city') city: string) {

    if (!city) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }

    if (!await this.weatherService.isCityExists(city)) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }

    return await this.weatherService.findOne(city);
  }


}
