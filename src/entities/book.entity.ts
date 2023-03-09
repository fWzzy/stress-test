import { BaseEntity } from '@app/core/database/base.entity';
import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { BookRepository } from 'src/repositories/book.repository';
import { User } from './user.entity';

@Entity({ tableName: 'book', customRepository: () => BookRepository })
export class Book extends BaseEntity {
  [EntityRepositoryType]?: BookRepository;

  @Property({ length: 255 })
  title!: string;

  @Property({ length: 255 })
  author!: string;

  @Property()
  isbn!: number;

  @ManyToOne({ entity: () => User })
  user!: User;
}
