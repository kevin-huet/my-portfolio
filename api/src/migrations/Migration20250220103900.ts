import { Migration } from '@mikro-orm/migrations';

export class Migration20250220103900 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`category\` (\`id\` text not null, \`name\` text not null, \`description\` text null, primary key (\`id\`));`);

    this.addSql(`create table \`project\` (\`id\` text not null, \`name\` text not null, \`description\` text null, primary key (\`id\`));`);

    this.addSql(`create table \`skill\` (\`id\` text not null, \`name\` text not null, \`description\` text null, \`category_id\` text not null, constraint \`skill_category_id_foreign\` foreign key(\`category_id\`) references \`category\`(\`id\`) on update cascade, primary key (\`id\`));`);
    this.addSql(`create index \`skill_category_id_index\` on \`skill\` (\`category_id\`);`);

    this.addSql(`create table \`timeline\` (\`id\` text not null, \`name\` text not null, \`description\` text null, primary key (\`id\`));`);
  }

}
