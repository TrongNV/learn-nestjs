import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppService } from '../services/app.service';

@ApiTags('test')
@ApiBearerAuth()
@Controller('/test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('value/:id')
  // index(@Param('id') id:string): string {
  //   return this.appService.getHello(id);
  // }
}
