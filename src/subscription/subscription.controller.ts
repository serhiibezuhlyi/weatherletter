import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  @UseInterceptors(NoFilesInterceptor())
  subscribe(@Body() body: any) {

    if (!['hourly', 'daily'].includes(body.frequency)){
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }

    const subscribed = ['email1@gmail.com', 'email3@gmail.com'];

    if (subscribed.includes(body.email)){
      throw new HttpException('Email already subscribed', HttpStatus.CONFLICT);
    }

    //some logic from service
    return {
      statusCode: HttpStatus.OK,
      message: 'Subscription successful. Confirmation email sent.'
    };
  }

  @Get('confirm/:token')
  confirm(@Param('token') token: string) {

    if (!token) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    console.log(token);

    return {
      statusCode: HttpStatus.OK,
      message: 'Subscription confirmed successfully',
    };

  }

  @Get('unsubscribe/:token')
  unsubscribe(@Param('token') token: string) {

    if (!token) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    console.log(token);

    return {
      statusCode: HttpStatus.OK,
      message: 'Unsubscribed successfully'
    };

  }

}
