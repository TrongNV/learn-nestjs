import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { EmailRequestDto, EmailResponsetDto } from 'src/common/dtos/email/email.dto';
import { SendgirdMailService } from 'src/common/services/mail/mail.service';

@ApiTags('email')
@ApiBearerAuth()
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
        try{
            await this.sendgridService.sendMailQueue(body.email);
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