import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';

import { WinstonLogger } from '@phobos/infrastructure';

import { AppModule } from 'src/app/app.module';
import { RpcModule } from 'lib/rpc/rpc-module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  const logger = await app.resolve(WinstonLogger);
  const rpcModule = new RpcModule();

  app.enableCors();
  app.useLogger(logger);
  app.useWebSocketAdapter(new WsAdapter(app));

  rpcModule.register(app["container"]);
  await app.listen(4002);
}

bootstrap();
