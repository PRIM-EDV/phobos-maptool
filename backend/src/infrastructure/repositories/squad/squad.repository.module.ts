import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbSquad, DbSquadSchema } from './schemas/squad.schema';
import { SquadRepository } from './squad.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: DbSquad.name, schema: DbSquadSchema }])
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