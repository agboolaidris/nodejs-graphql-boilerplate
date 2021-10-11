import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { IsEmail, IsEnum, IsPhoneNumber, Length } from "class-validator";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  constructor(models: Partial<any>) {
    super();
    Object.assign(this, models);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Length(3, 10)
  @Column({ unique: true })
  name: string;

  @Field()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Field()
  @IsPhoneNumber()
  @Column()
  telephone: string;

  @Column()
  password: string;

  @Field()
  @IsEnum(["admin", "user"])
  @Column({ enum: ["admin", "user"], default: "user" })
  role: string;

  @Field()
  @Column("uuid")
  uuid: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 5);
  }
}
