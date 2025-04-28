import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { MapEntitySquad, MapEntityType, Squad, SquadState } from "@phobos-maptool/models";

import { ISquadRepository } from "./interfaces/squad.repository.interface";
import { ISquadRpcAdapter } from "./interfaces/squad.rpc.adapter.interface";
import { SquadPlacedEvent } from "../common/events/squad-placed.event";
import { MapEntityPlacedEvent } from "../common/events/map-entity/map-entity-placed.event";


const SquadRepository = () => Inject('SquadRepository');
const SquadRpcAdapter = () => Inject('SquadRpcAdapter');

@Injectable()
export class SquadService { 
    constructor(
        private readonly eventEmitter: EventEmitter2,
        @SquadRepository() private readonly squadRepository: ISquadRepository,
        @SquadRpcAdapter() private readonly squadRpcAdapter: ISquadRpcAdapter
    ) {}

    public async place(squad: Squad): Promise<void> {
        this.eventEmitter.emit('squad.placed', new SquadPlacedEvent(squad));
        return await this.squadRepository.store(squad);
    }

    public async remove(squad: Squad): Promise<void> {
        return await this.squadRepository.delete(squad);
    }

    public async getAll(): Promise<Squad[]> {
        return await this.squadRepository.get();
    }

    @OnEvent('entity.placed')
    async handleEntityPlacedEvent(event: MapEntityPlacedEvent) {
        if (event.mapEntity.type == MapEntityType.FRIEND) {
            const entity = event.mapEntity.entity as MapEntitySquad;
            const existing = await this.squadRepository.get(entity.name);
            if (!existing) {
                const squad: Squad = { 
                    name:  entity.name, 
                    combattants: entity.combattants, 
                    callsign: entity.callsign, 
                    state: SquadState.IN_FIELD, 
                    position: 0 
                };
                
                await this.squadRepository.store(squad);
                await this.squadRpcAdapter.set(squad);
            }
        }
    }

    // @OnEvent('entity.removed')
    // async handleEntityRemovedEvent(event: EntityRemovedEvent) {
    //     const entity = event.entity;
    //     if (entity.type == MapEntityType.TYPE_FRIEND && entity.squad) {
    //         const existing = await this.squadRepository.get(entity.squad.name);
    //         if (existing) {
    //             await this.squadRepository.delete(existing);
    //             await this.squadRpcAdapter.delete(existing);
    //         }
    //     }
    // }
}