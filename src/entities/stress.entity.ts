import { BaseEntity } from '@app/core/database/base.entity';
import {
    Entity,
    EntityRepositoryType,
    ManyToOne,
    Property,
} from '@mikro-orm/core';
import { StressRepository } from 'src/repositories/stress.repository';
import { User } from './user.entity';

export enum StressLevel {
    BOREDOM = 0,
    COMFORT = 1,
    STRETCH = 2,
    OPTIMUM = 3,
    STRAIN = 4,
    BURNOUT = 5,
}

@Entity({ tableName: 'stresses', customRepository: () => StressRepository })
export class Stress extends BaseEntity {
    [EntityRepositoryType]?: StressRepository;

    @Property()
    level!: StressLevel;

    @Property({ length: 255 })
    image!: string;

    @Property()
    timestamp: number = new Date().getTime();

    @Property({ length: 255 })
    client!: string;

    @ManyToOne({ entity: () => User, nullable: true })
    user: User;
}
