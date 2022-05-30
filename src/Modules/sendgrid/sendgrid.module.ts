import { Module } from '@nestjs/common';
import { SendgirdMailController } from 'src/Controllers/sendgrid/sendgrid.controller';
import { SendgirdMailService } from 'src/Services/sendgrid/sendgrid.service';

@Module({
  imports: [],
  controllers: [SendgirdMailController],
  providers: [SendgirdMailService],
  exports: [SendgirdMailService]
})
export class SendgirdMailModule {}
