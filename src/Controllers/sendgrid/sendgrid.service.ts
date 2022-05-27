import { Controller, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/Decorator/public.decorator';
import { EmailRequestDto } from 'src/Dtos/email/email.dto';
import { SendgirdMailService } from 'src/Services/sendgrid/sendgrid.service';

@Controller('email')
export class SendgirdMailController {
    constructor(private readonly sendgridService: SendgirdMailService) { }

    @ApiOperation({
        summary: 'Send email'
    })
    @ApiCreatedResponse({
        type: EmailRequestDto,
        description: 'Send email successfully '
    })
    @Public()
    @Post('send-email')
    async sendEmail(@Query('email') email: EmailRequestDto) {
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
        try{
            await this.sendgridService.send(mail);
        }
        catch(e){
            return {
                isSucces: false
            }
        }
        return {
            isSucces: true
        }
    }
}