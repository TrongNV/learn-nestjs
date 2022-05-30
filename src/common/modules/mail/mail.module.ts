import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { SendgirdMailController } from 'src/common/controllers/mail/mail.controller';
import { SendMailConsumer } from 'src/common/processor/mail.processor';
import { SendgirdMailService } from 'src/common/services/mail/mail.service';

@Module({
  imports: [

    BullModule.registerQueue({
      name: 'sendmail'
    })
  ],
  controllers: [SendgirdMailController],
  providers: [SendgirdMailService, SendMailConsumer],
  exports: [SendgirdMailService]
})
export class SendgirdMailModule {}
