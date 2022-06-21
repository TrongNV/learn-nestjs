import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role, Roles } from 'src/common/decorator/roles.decorator';
import { StripeService } from 'src/common/services/stripe/stripe.service';
import Stripe from 'stripe';

@ApiBearerAuth()
@ApiTags('stripe')
@Controller('stripe')
@UseGuards(JwtAuthGuard)
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Get('payment')
  async getPaymentMethodForUser(@Req() req) {
    return this.stripeService.getPaymentMethodForUser(req.user);
  }

  @Post('payment')
  async createPaymentMethodForUser(@Req() req, @Body() body) {
    return this.stripeService.createPaymentMethodForUser(req, body);
  }

  @Post('product')
  async createProduct(@Body() body): Promise<Stripe.Response<Stripe.Price>> {
    return this.stripeService.createProduct(body.product);
  }

  @Get('product')
  async getListProduct():Promise<Stripe.ApiListPromise<Stripe.Product>> {
    return this.stripeService.getListProduct();
  }

  @Delete('subscription')
  async deleteSubscription(
    @Body() body,
  ): Promise<Stripe.Response<Stripe.Subscription>> {
    return this.stripeService.deleteSubscription(body.subId);
  }

  @Get('subscription/items')
  async getSubscriptionItems(
    @Body() body,
  ): Promise<Stripe.ApiListPromise<Stripe.SubscriptionItem>> {
    return this.stripeService.getSubscriptionItems(body.subId);
  }

  @Post('subscription/items')
  async createSubscriptionItem(@Req() req,@Body() body) {
    return this.stripeService.createSubscriptionItem(req.user, body);
  }

  @Delete('subscription/items')
  async deleteSubscriptionItem(@Req() req, @Body() body): Promise<Object>{
    return this.stripeService.deleteSubscriptionItem(req.user, body.subItemId)
  }
}
