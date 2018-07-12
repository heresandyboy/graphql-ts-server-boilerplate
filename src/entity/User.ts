import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import * as uuidv4 from "uuid/v4"; // tslint overridden for submodule import / also need to import * as - because no default export defined

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("text") password: string;
}
