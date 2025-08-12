import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MapEntityRepository } from './map-entity.repository';
import { MapEntityType } from '@phobos-maptool/models';

import { MapEntityBaseSchema } from './schemas/map-entity-base.schema';
import { MapEntitySquadSchema } from './schemas/map-entity-squad.schema';
import { MapEntityFoeSchema } from './schemas/map-entity-foe.schema';
import { MapEntityObjectiveSchema } from './schemas/map-entity-objective.schema';
import { WinstonLoggerModule } from '../../logger/winston/winston.logger.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'MapEntity',
        useFactory: () => {
          const schema = MapEntityBaseSchema;
          schema.discriminator(MapEntityType.FRIEND, MapEntitySquadSchema);
          schema.discriminator(MapEntityType.FOE, MapEntityFoeSchema);
          schema.discriminator(MapEntityType.OBJECT, MapEntityObjectiveSchema);
          return schema;
        },
      },
    ]),
    WinstonLoggerModule
  ],
  providers: [
    {
      provide: 'MapEntityRepository',
      useClass: MapEntityRepository,
    },
  ],
  exports: [
    {
      provide: 'MapEntityRepository',
      useClass: MapEntityRepository,
    },
  ],
})
export class MapEntityRepositoryModule {}
