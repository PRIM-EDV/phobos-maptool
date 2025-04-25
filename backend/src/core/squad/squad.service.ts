import { Inject, Injectable } from "@nestjs/common";
import { ISquadRepository } from "./interfaces/squad.repository.interface";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { SquadPlacedEvent } from "../events/squad-placed.event";
import { Squad, SquadState } from "proto/trx/trx.squad";
import { EntityPlacedEvent } from "../events/map-entity/entity-placed.event";
import { MapEntityType } from "proto/trx/trx.entity";
import { ISquadRpcAdapter } from "./interfaces/squad.rpc.adapter.interface";
import { EntityRemovedEvent } from "../events/map-entity/entity-removed.event";

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
    async handleEntityPlacedEvent(event: EntityPlacedEvent) {
        const entity = event.entity;
        if (entity.type == MapEntityType.TYPE_FRIEND && entity.squad) {
            const existing = await this.squadRepository.get(entity.squad.name);
            if (!existing) {
                const squad: Squad = { 
                    name:  entity.squad.name, 
                    combattants: entity.squad.combattants, 
                    callsign: entity.squad.callsign, 
                    state: SquadState.SQUAD_STATE_IN_FIELD, 
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