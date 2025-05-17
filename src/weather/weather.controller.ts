import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeather(@Query('city') city: string) {

    if (!city) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }

    const cities = ['Kyiv', 'Lviv', 'Kharkiv'];
    if (!cities.includes(city)) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }

    const weather: CreateWeatherDto = {
      temperature: 10,
      humidity: 4,
      description: `Weather in ${city}`
    };
    return weather;
  }



}
