import {Injectable, NotFoundException} from '@nestjs/common';
import {EntityManager, EntityRepository} from "@mikro-orm/sqlite";
import {Project} from "../../entities/project.entity";
import {ProjectDto} from "./dto/project.dto";
import {InjectRepository} from "@mikro-orm/nestjs";
import {BaseService} from "../../base.service";
import {FilterQuery} from "@mikro-orm/core";

@Injectable()
export class ProjectsService extends BaseService<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: EntityRepository<Project>,
    private readonly em: EntityManager
  ) {
    super(projectRepository);
  }

  async deleteById(id: string) {
    const result = await this.projectRepository.findOne({ id: id });
    await this.em.removeAndFlush(result);
    return result;
  }
}
