import { Module } from '@nestjs/common';
import { SendgirdMailController } from 'src/common/controllers/sendgrid/sendgrid.controller';
import { SendgirdMailService } from 'src/common/services/sendgrid/sendgrid.service';

@Module({
  imports: [],
  controllers: [SendgirdMailController],
  providers: [SendgirdMailService],
  exports: [SendgirdMailService]
})
export class SendgirdMailModule {}
