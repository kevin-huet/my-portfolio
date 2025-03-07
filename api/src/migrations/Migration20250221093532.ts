import { Migration } from '@mikro-orm/migrations';

export class Migration20250221093532 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user\` (\`id\` text not null, \`username\` text not null, \`password\` text not null, primary key (\`id\`));`);
  }

}
