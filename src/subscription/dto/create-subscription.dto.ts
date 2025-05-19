import { IsBoolean, IsEmail, IsIn, IsString } from 'class-validator';
import { OneToOne } from 'typeorm';
import { Forecast } from '../../weather/entities/weather.entity';

export class CreateSubscriptionDto {

  @IsEmail()
  email: string;

  @IsString()
  city: string;

  @IsIn(['hourly', 'daily'])
  frequency: string;

  @IsBoolean()
  is_verified: boolean;

}
