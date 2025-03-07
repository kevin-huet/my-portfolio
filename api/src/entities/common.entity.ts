import {PrimaryKey} from "@mikro-orm/core";
import {v7 as uuidv7} from "uuid";

export class CommonEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv7();
}