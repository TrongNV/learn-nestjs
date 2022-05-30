import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { Queue } from 'bull';
import { EmailRequestDto } from 'src/common/dtos/email/email.dto';

@Injectable()
export class SendgirdMailService {
    constructor(
        @InjectQueue('sendmail') private mailQueue: Queue,
        private readonly configService: ConfigService

    ) {
        SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
    }

    async sendEmail(email: EmailRequestDto) {

        const mail = {
            to: email,
            subject: 'Hello from sendgrid',
            from: {
                name: 'Demo Email sendgrid',
                email: process.env.FROM_EMAIL
            },
            text: 'Hello sendgird email',
            html: '<h1>Hello</h1>',
        };

        const transport = await SendGrid.send(mail);
        
        console.log(`E-Mail sent to ${email.email}`);
        return transport;
    }

    async sendMailQueue(email: string): Promise<object> {

        return this.mailQueue.add('confirmation', { email });
    }
}