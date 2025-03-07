import {Entity, Property} from "@mikro-orm/core";
import {CommonEntity} from "./common.entity";

@Entity({ tableName: 'timeline' })
export class Timeline extends CommonEntity {
  @Property()
  name!: string;

  @Property()
  description?: string;

  @Property()
  startedAt: Date;

  @Property()
  endedAt: Date;
}