import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = app.get(ConfigService).get('PORT');
  await app.listen(PORT, () => {
    console.log(`Service listening on port ${PORT}`);
  });
}
bootstrap();
