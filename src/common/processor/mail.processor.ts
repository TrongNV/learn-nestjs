import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { SendgirdMailService } from '../services/mail/mail.service';

@Processor('sendmail')
export class SendMailConsumer {
    private readonly logger = new Logger(this.constructor.name);
    constructor(private readonly mailService: SendgirdMailService) { }


    @OnQueueActive()
    onActive(job: Job) {
        console.log(
            `Processor:@OnQueueActive - Processing job ${job.id} of type ${job.name
            }. Data: ${JSON.stringify(job.data)}`,
        );
    }

    @OnQueueCompleted()
    onComplete(job: Job) {
        console.log(
            `Processor:@OnQueueCompleted - Completed job ${job.id} of type ${job.name}.`,
        );
    }

    @OnQueueFailed()
    onError(job: Job<any>, error) {
        console.log(
            `Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.message}`,
            error.stack,
        );
    }

    @Process('confirmation')
    async sendMailQueue(job: Job): Promise<any> {
        console.log('Processor:@Process - Sending confirmation email.');

        try {
            const result = await this.mailService.sendEmail(job.data);

            return result;
        } catch (error) {
            this.logger.error('Failed to send confirmation email.', error.stack);
            throw error;
        }
    }
}