import {Injectable, NotFoundException} from '@nestjs/common';
import {EntityManager, EntityRepository} from "@mikro-orm/sqlite";
import {InjectRepository} from "@mikro-orm/nestjs";
import {Skill} from "../../entities/skill.entity";
import {SkillDto} from "./dto/skill.dto";
import {BaseService} from "../../base.service";
import {Category} from "../../entities/category.entity";

@Injectable()
export class SkillsService extends BaseService<Skill> {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: EntityRepository<Skill>,
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
    private readonly em: EntityManager
  ) {
    super(skillRepository);
  }

  async createSkill(skillDto: SkillDto) {
    const skill = this.skillRepository.create(skillDto);
    let category = await this.categoryRepository.findOne({ id: skillDto.category })
    if (!category) {
      category = this.categoryRepository.create({ name: skillDto.category });
    }
    category.skills.add(skill);
    skill.category = category;

    this.em.persist(skill);
    this.em.persist(category);
    await this.em.flush();

    return skill;
  }

  async getCategories() {
    return this.categoryRepository.findAll();
  }

  async createCategories(name: string) {
    const category = this.categoryRepository.create({ name: name });
    this.em.persist(category);
    await this.em.flush();

    return category;
  }
}
