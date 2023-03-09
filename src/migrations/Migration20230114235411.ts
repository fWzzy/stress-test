import { Migration } from '@mikro-orm/migrations';

export class Migration20230114235411 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `user` (`id` int unsigned not null auto_increment primary key, `idx` varchar(255) not null, `is_active` tinyint(1) not null default true, `is_obsolete` tinyint(1) not null default false, `deleted_at` datetime null, `created_at` datetime not null, `updated_at` datetime null, `email` varchar(255) not null, `password` varchar(255) not null) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql(
      'alter table `user` add index `user_deleted_at_index`(`deleted_at`);',
    );
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');

    this.addSql(
      'create table `book` (`id` int unsigned not null auto_increment primary key, `idx` varchar(255) not null, `is_active` tinyint(1) not null default true, `is_obsolete` tinyint(1) not null default false, `deleted_at` datetime null, `created_at` datetime not null, `updated_at` datetime null, `title` varchar(255) not null, `author` varchar(255) not null, `isbn` int not null, `user_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql(
      'alter table `book` add index `book_deleted_at_index`(`deleted_at`);',
    );
    this.addSql(
      'alter table `book` add index `book_user_id_index`(`user_id`);',
    );

    this.addSql(
      'alter table `book` add constraint `book_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table `book` drop foreign key `book_user_id_foreign`;');

    this.addSql('drop table if exists `user`;');

    this.addSql('drop table if exists `book`;');
  }
}
