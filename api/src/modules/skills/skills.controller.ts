import {Body, Controller, Delete, Get, Post, Put, UseGuards} from '@nestjs/common';
import {SkillsService} from "./skills.service";
import {SkillDto} from "./dto/skill.dto";
import {JwtAuthGuard} from "../auth/guards/auth.guard";

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillService: SkillsService) {
  }
  @Get()
  async getSkills() {
    return this.skillService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async PostSkill(@Body() body : SkillDto) {
    return this.skillService.createSkill(body);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteSkills() {
    await this.skillService.deleteBy({});
  }

  @Get('categories')
  async getCategories() {
    return this.skillService.getCategories();
  }

  @Post('category')
  async createCategory(@Body('name') name: string) {
    return this.skillService.createCategories(name);
  }
}
