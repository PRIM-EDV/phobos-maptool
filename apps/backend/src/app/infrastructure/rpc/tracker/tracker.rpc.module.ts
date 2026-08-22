import { Module } from '@nestjs/common';
import { WinstonLoggerModule } from '@phobos/infrastructure';
import { TrackerRpcAdapter } from './tracker.rpc.adapter';

@Module({
    imports: [WinstonLoggerModule],
    providers: [{ provide: 'TrackerRpcAdapter', useClass: TrackerRpcAdapter }],
    exports: [{ provide: 'TrackerRpcAdapter', useClass: TrackerRpcAdapter }]
})
export class TrackerRpcModule {}
