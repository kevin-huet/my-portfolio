import {Entity, Property} from "@mikro-orm/core";
import {CommonEntity} from "./common.entity";

@Entity({ tableName: 'user' })
export class User extends CommonEntity {
  @Property()
  username!: string;

  @Property()
  password!: string;
}