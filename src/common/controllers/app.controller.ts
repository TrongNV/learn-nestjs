import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorator/public.decorator';
import { AppService } from '../services/app.service';

@ApiTags('test')
@ApiBearerAuth()
@Controller('/test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  index(): string {
    const strCompare = "1261526152";
    return strCompare.repeat(1000000);
  }
}
