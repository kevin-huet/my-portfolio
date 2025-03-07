import { Module } from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/auth.guard";
import {APP_GUARD} from "@nestjs/core";
import {JwtService} from "@nestjs/jwt";
import {SkillsController} from "./skills.controller";
import {SkillsService} from "./skills.service";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {Skill} from "../../entities/skill.entity";
import {Category} from "../../entities/category.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature([Skill, Category])
  ],
  controllers: [SkillsController],
  providers: [
    SkillsService,
    JwtService
  ],
  exports: [MikroOrmModule]
})
export class SkillsModule {}
