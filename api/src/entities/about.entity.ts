import {Entity, Property} from "@mikro-orm/core";
import {CommonEntity} from "./common.entity";

@Entity({ tableName: 'about' })
export class About extends CommonEntity {
  @Property()
  description?: string;

  @Property()
  createdAt?: Date;
}