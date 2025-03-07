import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {ThrottlerModule} from "@nestjs/throttler";
import {SkillsModule} from './modules/skills/skills.module';
import {ProjectsModule} from './modules/projects/projects.module';
import {ContactModule} from './modules/contact/contact.module';
import {TimelineModule} from './modules/timeline/timeline.module';
import {MikroOrmCoreModule} from "@mikro-orm/nestjs/mikro-orm-core.module";
import {AuthModule} from './modules/auth/auth.module';
import {DevtoolsModule} from "@nestjs/devtools-integration";

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    MikroOrmCoreModule.forRoot(),
    SkillsModule,
    ProjectsModule,
    ContactModule,
    TimelineModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
