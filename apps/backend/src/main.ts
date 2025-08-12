import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';

import { AppModule } from 'src/app/app.module';
import { RpcModule } from 'lib/rpc/rpc-module';
import { WinstonLogger } from 'src/app/infrastructure/logger/winston/winston.logger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rpcModule = new RpcModule();
  const logger = await app.resolve(WinstonLogger);
  const config = app.get<ConfigService>(ConfigService);

  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useLogger(logger);

  rpcModule.register(app["container"]);

  await app.listen(4002);
}

bootstrap();
