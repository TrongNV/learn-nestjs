import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/Decorator/public.decorator';
import { EmailRequestDto, EmailResponsetDto } from 'src/Dtos/email/email.dto';
import { SendgirdMailService } from 'src/Services/sendgrid/sendgrid.service';

@Controller('email')
export class SendgirdMailController {
    constructor(private readonly sendgridService: SendgirdMailService) { }

    @ApiOperation({
        summary: 'Send email'
    })
    @ApiCreatedResponse({
        type: EmailResponsetDto,
        description: 'Send email successfully '
    })
    @Public()
    @Post('send-email')
    async sendEmail(@Body() body: EmailRequestDto): Promise<EmailResponsetDto> {
        
        const mail = {
            to: body.email,
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
                isSuccess: false
            }
        }
        return {
            isSuccess: true
        }
    }
}