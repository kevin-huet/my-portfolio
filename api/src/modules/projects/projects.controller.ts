import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ProjectsService} from "./projects.service";
import {ProjectDto} from "./dto/project.dto";
import {JwtAuthGuard} from "../auth/guards/auth.guard";

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {
  }

  @Get()
  async getProjects() {
    return this.projectsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async postProject(@Body() body: ProjectDto) {
    return this.projectsService.create(body);
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  async deleteProject(@Param('uuid') id: string) {
    return this.projectsService.deleteById(id);
  }
}
