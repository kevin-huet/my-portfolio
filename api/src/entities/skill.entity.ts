import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {Category} from "./category.entity";
import {CommonEntity} from "./common.entity";

@Entity({ tableName: 'skill' })
export class Skill extends CommonEntity {
  @Property()
  name!: string;

  @Property()
  description?: string;

  @ManyToOne({ entity: () => Category })
  category?: Category;
}