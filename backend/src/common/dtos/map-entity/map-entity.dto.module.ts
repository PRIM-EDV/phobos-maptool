import { Module } from '@nestjs/common';
import { MapEntityDtoService } from './map-entity.dto.service';
import { WinstonLoggerModule } from 'src/infrastructure/logger/winston/winston.logger.module';

@Module({
    imports: [
        WinstonLoggerModule
    ],
    providers: [
        MapEntityDtoService
    ],
    exports: [
        MapEntityDtoService
    ]
})
export class MapEntityDtoModule {}