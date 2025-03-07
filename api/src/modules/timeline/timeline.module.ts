import { Module } from '@nestjs/common';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {JwtService} from "@nestjs/jwt";
import {Timeline} from "../../entities/timeline.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Timeline])],
  controllers: [TimelineController],
  providers: [TimelineService, JwtService],
  exports: [MikroOrmModule]
})
export class TimelineModule {}
