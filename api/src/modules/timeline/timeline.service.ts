import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@mikro-orm/nestjs";
import {EntityManager, EntityRepository} from "@mikro-orm/sqlite";
import {Timeline} from "../../entities/timeline.entity";
import {BaseService} from "../../base.service";
import {Category} from "../../entities/category.entity";

@Injectable()
export class TimelineService extends BaseService<Timeline> {
  constructor(
    @InjectRepository(Timeline)
    private readonly timelineRepository: EntityRepository<Timeline>,
    private readonly em: EntityManager
  ) {
    super(timelineRepository);
  }
}
