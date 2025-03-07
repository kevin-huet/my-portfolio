import { Migration } from '@mikro-orm/migrations';

export class Migration20250221095123 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`timeline\` add column \`started_at\` datetime not null;`);
    this.addSql(`alter table \`timeline\` add column \`ended_at\` datetime not null;`);
  }

}
