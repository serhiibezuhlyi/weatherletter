import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  @UseInterceptors(NoFilesInterceptor())
  async subscribe(@Body() body: any) {

    if (!body.email || !body.city || !body.frequency || !['hourly', 'daily'].includes(body.frequency)){
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }

    if (await this.subscriptionService.isEmailExists(body.email)){
      throw new HttpException('Email already subscribed', HttpStatus.CONFLICT);
    }

    const subscription: CreateSubscriptionDto = {
      email: body.email,
      city: body.city,
      frequency: body.frequency,
      is_verified: false
    }

    await this.subscriptionService.create(subscription)

    const token = this.subscriptionService.encrypt(subscription.email);

    //some function to send email with link https://{domain_name}/subscription/subscribe/{token}

    return {
      statusCode: HttpStatus.OK,
      message: `Subscription successful. Confirmation email sent. Token: ${token}`,
    };
  }

  @Get('confirm/:token')
  async confirm(@Param('token') token: string) {

    try{
      const email = this.subscriptionService.decrypt(token);
      await this.subscriptionService.update(email, {is_verified: true});
    } catch(error){
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Subscription confirmed successfully',
    };

  }

  @Get('unsubscribe/:token')
  async unsubscribe(@Param('token') token: string) {

    try{
      const email = this.subscriptionService.decrypt(token);
      await this.subscriptionService.remove(email)
    } catch(error){
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Unsubscribed successfully'
    };

  }

}
