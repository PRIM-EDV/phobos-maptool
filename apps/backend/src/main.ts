import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { RpcModule } from 'lib/rpc/rpc-module';
import { WinstonLogger } from './app/infrastructure/logger/winston/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rpcModule = new RpcModule();
  const logger = await app.resolve(WinstonLogger);


  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useLogger(logger);

  rpcModule.register(app["container"]);

  await app.listen(4002);
}
bootstrap();
