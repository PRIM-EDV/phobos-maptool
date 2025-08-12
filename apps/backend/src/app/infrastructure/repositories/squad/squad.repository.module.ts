import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SquadRepository } from './squad.repository';
import { SquadSchema } from './schemas/squad.schema';
import { WinstonLoggerModule } from '../../logger/winston/winston.logger.module';

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