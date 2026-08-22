import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonLoggerModule } from '@phobos/infrastructure';

import { TrackerRepository } from './tracker.repository';
import { TrackerSchema } from './schemas/tracker.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Tracker", schema: TrackerSchema }]),
        WinstonLoggerModule
    ],
    providers: [{
        provide: "TrackerRepository",
        useClass: TrackerRepository
    }],
    exports: [{
        provide: "TrackerRepository",
        useClass: TrackerRepository
    }]
})
export class TrackerRepositoryModule { }
