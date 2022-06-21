import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { exist } from 'joi';
import { AnyKeys, Model, ObjectId } from 'mongoose';
import {
  StripeDocument,
  Stripe as _Stripe,
} from 'src/common/schemas/stripe/stripe.schema';
import { User } from 'src/common/schemas/user/user.schema';
import { Stripe } from 'stripe';
import { UsersService } from '../users/users.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(
    @InjectModel(Stripe.name) private stripeModel: Model<StripeDocument>,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2020-08-27',
    });
  }

  async createStripeCard(
    userId: ObjectId,
    card: Object,
    type: string = 'card',
  ): Promise<_Stripe> {
    return this.stripeModel.create({
      userId,
      card,
      type,
    });
  }

  async createPlan(): Promise<Stripe.Response<Stripe.Plan>> {
    const price = 20; //usd
    return this.stripe.plans.create({
      amount: price * 100,
      currency: 'usd',
      interval: 'day',
      product: '628c667d04b8cbcb039018f4',
    });
  }

  async createPrice(
    product,
    productId: string,
  ): Promise<Stripe.Response<Stripe.Price>> {
    return this.stripe.prices.create({
      unit_amount: product.amount * 100,
      currency: product.currency,
      recurring: { interval: product.recurring },
      product: productId,
    });
  }

  async createProduct(product): Promise<Stripe.Response<Stripe.Price>> {
    try {
      const productPayment = await this.stripe.products.create({
        name: product.name,
        id: product.id,
        images: [product.image],
        description: product.description,
      });
      const price = await this.createPrice(product, productPayment.id);

      await this.stripe.products.update(productPayment.id, {
        default_price: price.id,
      });

      return price;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getListProduct(): Promise<Stripe.ApiListPromise<Stripe.Product>> {
    try {
      return this.stripe.products.list();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getSubscriptionItems(
    subId: string,
  ): Promise<Stripe.ApiListPromise<Stripe.SubscriptionItem>> {
    return this.stripe.subscriptionItems.list({
      subscription: subId,
    });
  }

  async createSubscriptionItem(
    user: any,
    body: any,
  ): Promise<Stripe.Response<Stripe.SubscriptionItem>> {
    const { priceId, quantity } = body;

    try {
      const { subId, customerId } = await this.usersService.GetUserByUserId(
        user._id,
      );
      if (!subId) {
        return this.createSubscription(user._id, customerId, priceId, quantity);
      }

      const subItem = await this.stripe.subscriptionItems.create({
        subscription: subId,
        price: priceId,
        quantity: quantity || 1,
      });
      return subItem;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteSubscriptionItem(user: any, subItemId: string): Promise<Object> {
    try {
      const { subId } = await this.usersService.GetUserByUserId(user._id);
      if (!subId) {
        throw new HttpException(
          "Description doesn't exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      const subscriptionItems = await this.stripe.subscriptionItems.list({
        subscription: subId,
      });

      if (subscriptionItems.data.length > 1) {
        await this.stripe.subscriptionItems.del(subItemId);
      } else {
        await this.stripe.subscriptions.del(subId);
        await this.usersService.updateUserByUserId(user._id, {
          subId: null,
        });
      }

      return {
        isSuccess: true,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createSubscription(
    userId: ObjectId,
    customerId: string,
    priceId: string,
    quantity: number,
  ): Promise<Stripe.Response<Stripe.SubscriptionItem>> {
    try {
      if (!customerId) {
        throw new HttpException(
          "customers who haven't registered for online payment!",
          HttpStatus.BAD_REQUEST,
        );
      }
      const sub = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
      });

      await this.usersService.updateUserByUserId(userId, {
        subId: sub.id,
      });

      const subItemId = sub.items.data[0].id;

      return this.stripe.subscriptionItems.retrieve(subItemId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteSubscription(
    subId: string,
  ): Promise<Stripe.Response<Stripe.Subscription>> {
    return this.stripe.subscriptions.del(subId);
  }

  async getPaymentMethodForUser(
    user,
  ): Promise<Stripe.ApiListPromise<Stripe.PaymentMethod>> {
    try {
      const { customerId } = await this.usersService.GetUserByUserId(user._id);
      return this.stripe.customers.listPaymentMethods(customerId, {
        type: 'card',
      });
    } catch (e) {}
  }

  async createPaymentMethodForUser(req, body): Promise<Object> {
    try {
      const { type, card } = body;

      const user = await this.createCustomer(req.user._id);

      const payment = await this.stripe.paymentMethods.create({
        type: type,
        card: {
          number: card.number,
          exp_month: card.expMonth,
          exp_year: card.expYear,
          cvc: card.cvc,
        },
      });

      await this.stripe.paymentMethods.attach(payment.id, {
        customer: user.customerId,
      });

      // set default payment method
      const customers = await this.stripe.customers.retrieve(user.customerId);
      const checkDefaultPaymentMethod =
        customers['invoice_settings']['default_payment_method'];
      if (!checkDefaultPaymentMethod) {
        await this.stripe.customers.update(user.customerId, {
          invoice_settings: {
            default_payment_method: payment.id,
          },
        });
      }
      return {
        isSuccess: true,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getStripeByUserIdAndCardNumber(
    userId: ObjectId,
    cardNumber: number,
  ): Promise<_Stripe> {
    return this.stripeModel.findOne({
      userId,
      ['card.number']: cardNumber,
    });
  }

  async createCustomer(userId: ObjectId): Promise<User> {
    const user = await this.usersService.GetUserByUserId(userId);
    if (!user.customerId) {
      let customer = await this.stripe.customers.create({
        name: user.username,
        email: user.email,
      });
      return this.usersService.updateUserByUserId(userId, {
        customerId: customer.id,
      });
    }
    return user;
  }
  async charge(user: any): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const customer = await this.createCustomer(user);
    return this.stripe.paymentIntents.create({
      amount: 800,
      // customer: customer.id,
      currency: this.configService.get('STRIPE_CURRENCY'),
      description: 'You bought a massage for $8',
      payment_method_types: ['card'],
    });
  }
}
