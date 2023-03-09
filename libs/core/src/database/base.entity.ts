import { Index, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiHideProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { SoftDelete } from '../decorators/soft-delete.decorator';

@SoftDelete()
export abstract class BaseEntity {
  @ApiHideProperty()
  @PrimaryKey()
  id!: number;

  @Property()
  idx: string = randomUUID();

  @Property()
  isActive = true;

  @Property({ hidden: true })
  isObsolete = false; // deleted status, hidden true removed the property during deserialization

  @Index()
  @Property({ nullable: true })
  deletedAt?: Date;

  @Property()
  createdAt = new Date();

  @Property({
    onUpdate: () => new Date(),
    hidden: true,
  })
  updatedAt? = new Date();
}
