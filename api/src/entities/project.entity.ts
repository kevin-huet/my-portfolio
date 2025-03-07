import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {CommonEntity} from "./common.entity";

@Entity({ tableName: 'project' })
export class Project extends CommonEntity {
  @Property()
  name!: string;

  @Property()
  description?: string;
}