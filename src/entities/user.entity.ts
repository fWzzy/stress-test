import { BaseEntity } from '@app/core/database/base.entity';
import {
  BeforeCreate,
  BeforeUpdate,
  Collection,
  Entity,
  EntityRepositoryType,
  EventArgs,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { hash } from 'argon2';
import { UserRepository } from 'src/repositories/user.repository';
import { Book } from './book.entity';

@Entity({ tableName: 'user', customRepository: () => UserRepository })
export class User extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;

  constructor(data?: Pick<User, 'idx'>) {
    super();
    Object.assign(this, data);
  }

  @Unique()
  @Property({ length: 255 })
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @OneToMany(() => Book, (book) => book.user)
  books = new Collection<Book>(this);

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword(arguments_: EventArgs<this>) {
    if (arguments_.changeSet.payload?.password) {
      this.password = await hash(this.password);
    }
  }
}
