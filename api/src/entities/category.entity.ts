import {Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import {Skill} from "./skill.entity";
import {CommonEntity} from "./common.entity";

@Entity({ tableName: 'category' })
export class Category extends CommonEntity {
  @Property()
  name!: string;

  @Property()
  description?: string;

  @OneToMany({entity: () => Skill, mappedBy: 'category', orphanRemoval: true})
  skills = new Collection<Skill>(this);
}