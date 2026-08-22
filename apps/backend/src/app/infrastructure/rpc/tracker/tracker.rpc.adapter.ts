import { Injectable } from '@nestjs/common';
import { WinstonLogger } from '@phobos/infrastructure';
import { toTrackerDto } from '@phobos-maptool/dto';
import { Tracker } from '@phobos-maptool/models';
import { Request as MaptoolRequest } from '@phobos-maptool/protocol';

import { AppGateway } from 'src/app/app.gateway';
import { ITrackerRpcAdapter } from 'src/app/core/tracker/interfaces/tracker.rpc.adapter.interface';

@Injectable()
export class TrackerRpcAdapter implements ITrackerRpcAdapter {
    constructor(
        private readonly logger: WinstonLogger,
        private readonly gateway: AppGateway,
    ) {
        this.logger.setContext(TrackerRpcAdapter.name);
    }

    public async set(tracker: Tracker): Promise<void> {
        const req: MaptoolRequest = { setTracker: { tracker: toTrackerDto(tracker) } }
        await this.gateway.requestAll(req);
    }
}
