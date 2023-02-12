import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar'})
  email: string;

  @Column({type:'varchar', nullable: false})
  password: string;

  @Column({type:'varchar'})
  role: string;
}
