import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('main')
@Controller('main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Test app' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
