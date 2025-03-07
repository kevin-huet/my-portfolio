import {defineConfig, SqliteDriver} from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  driver: SqliteDriver,
  dbName: 'file.db',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, EntityGenerator, SeedManager, EntityGenerator],
});