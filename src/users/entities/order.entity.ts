import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { Entity, Column, Timestamp } from 'typeorm';


@Entity()
export class Order {
  @Column({type:'date'})
  date: Date;

  user: User;
  products: Product[];
}
