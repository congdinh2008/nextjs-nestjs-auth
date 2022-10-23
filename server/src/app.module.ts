import { Module } from '@nestjs/common';
import { getEnvPath } from './helpers/env.helper';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const envFilePath: string = getEnvPath(`${__dirname}/environments`);
@Module({
  imports: [ConfigModule.forRoot({ envFilePath: envFilePath, isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
