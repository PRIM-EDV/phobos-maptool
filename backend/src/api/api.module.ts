import { Module } from '@nestjs/common';
import { MapApiModule } from './map/map.api.module';
import { AuthApiModule } from './auth/auth.api.module';
import { SquadApiModule } from './squad/squad.api.module';

@Module({
    imports: [
        AuthApiModule,
        MapApiModule,
        SquadApiModule
    ],
})
export class ApiModule {}