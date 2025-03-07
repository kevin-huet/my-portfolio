import {Body, Controller, Delete, Get, Post, Query, UseGuards} from '@nestjs/common';
import {TimelineService} from "./timeline.service";
import {TimelineDto} from "./dto/timeline.dto";
import {JwtAuthGuard} from "../auth/guards/auth.guard";
import {Timeline} from "../../entities/timeline.entity";

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {
  }

  @Get()
  async getTimeline() {
    const timelines = await this.timelineService.findAll();
    return timelines.map((timeline: Timeline) => ({
      id: timeline.id,
      name: timeline.name,
      description: timeline.description,
      startedAt: timeline.startedAt ? timeline.startedAt.toLocaleDateString('fr-FR') : null,
      endedAt: timeline.endedAt ? timeline.endedAt.toLocaleDateString('fr-FR') : null
    }));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addTimeline(@Body() body: TimelineDto) {
    return this.timelineService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTimeline(@Query('id') id: string) {
    return this.timelineService.deleteBy({id: id});
  }
}
