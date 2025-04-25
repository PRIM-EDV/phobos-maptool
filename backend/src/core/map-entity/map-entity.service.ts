import { Inject, Injectable } from "@nestjs/common";
import { IMapEntityRepository } from "./interfaces/map-entity.repository.interface";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { SquadPlacedEvent } from "../common/events/squad-placed.event";
import { v4 as uuidv4 } from 'uuid';
import { IMapEntityRpcAdapter } from "./interfaces/map-entity.rpc.adapter.interface";
import { MapEntityPlacedEvent } from "../common/events/map-entity/map-entity-placed.event";
import { MapEntityRemovedEvent } from "../common/events/map-entity/map-entity-removed.event";
import { MapEntity, MapEntityStatus, MapEntityType } from "../common/models/map-entity";
import { SquadState } from "../common/models/squad";

const MapEntityRepository = () => Inject('MapEntityRepository');
const MapRpcAdapter = () => Inject('MapEntityRpcAdapter');


@Injectable()
export class MapEntityService {
    constructor(
        private readonly eventEmitter: EventEmitter2,

        @MapEntityRepository() private readonly mapEntityRepository: IMapEntityRepository,
        @MapRpcAdapter() private readonly mapEntityRpcAdapter: IMapEntityRpcAdapter
    ) {}

    public async place(entity: MapEntity): Promise<void> {
        this.eventEmitter.emit('entity.placed', new MapEntityPlacedEvent(entity));
        return await this.mapEntityRepository.store(entity);
    }

    public async remove(entity: MapEntity): Promise<void> {
        this.eventEmitter.emit('entity.removed', new MapEntityRemovedEvent(entity));
        return await this.mapEntityRepository.delete(entity);
    }

    public async getAll(): Promise<MapEntity[]> {
        return await this.mapEntityRepository.get();
    }

    @OnEvent('squad.placed')
    async handleSquadPlacedEvent(event: SquadPlacedEvent) {
        const squad = event.squad;
        const repoMapEntity = await this.mapEntityRepository.getBySquadName(event.squad.name);

        if (squad.state == SquadState.IN_FIELD && !repoMapEntity) {
            console.log('squad placed', squad);
            const mapEntity: MapEntity = {
                id: uuidv4(),
                type: MapEntityType.FRIEND,
                position: {x: 300, y: 1090},
                entity: {
                    name: squad.name,
                    callsign: squad.callsign,
                    trackerId: -1,
                    combattants: squad.combattants,
                    status: MapEntityStatus.REGULAR
                }
            }
            await this.mapEntityRepository.store(mapEntity);
            await this.mapEntityRpcAdapter.set(mapEntity);
        }

        if (squad.state != SquadState.IN_FIELD && repoMapEntity) {
            await this.remove(repoMapEntity);
            await this.mapEntityRpcAdapter.delete(repoMapEntity);
        }     
    }
}
