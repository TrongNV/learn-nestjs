import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeController } from 'src/common/controllers/stripe/stripe.controller';
import { StripeSchema } from 'src/common/schemas/stripe/stripe.schema';
import { StripeService } from 'src/common/services/stripe/stripe.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Stripe', schema: StripeSchema }]),
    UsersModule,
  ],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
