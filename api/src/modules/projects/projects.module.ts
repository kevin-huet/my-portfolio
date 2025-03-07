import { Module } from '@nestjs/common';
import {ProjectsController} from "./projects.controller";
import {ProjectsService} from "./projects.service";
import {Project} from "../../entities/project.entity";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [MikroOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    JwtService
  ],
  exports: [MikroOrmModule]
})
export class ProjectsModule {}
