import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonLoggerModule } from '@phobos/infrastructure';

import { SquadRepository } from './squad.repository';
import { SquadSchema } from './schemas/squad.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Squad", schema: SquadSchema }]),
        WinstonLoggerModule
    ],
    providers: [{
        provide: "SquadRepository",
        useClass: SquadRepository
    }],
    exports: [{
        provide: "SquadRepository",
        useClass: SquadRepository
    }]
})
export class SquadRepositoryModule { }