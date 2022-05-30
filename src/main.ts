import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './common/modules/app.module';
import connectSwagger from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  connectSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    console.log('Connect server port: ', port);
  });
}
bootstrap();
