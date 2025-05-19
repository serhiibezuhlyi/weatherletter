import { IsBoolean, IsEmail, IsIn, IsString } from 'class-validator';

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
