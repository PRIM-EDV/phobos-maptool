import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SquadRepository } from './squad.repository';
import { SquadSchema } from './schemas/squad.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Squad", schema: SquadSchema }])
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