import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { Entity, Column } from 'typeorm';
import { timestamp } from 'rxjs';

@Entity()
export class Order {
  @Column({type:'date', default:timestamp})
  date: Date;

  user: User;
  products: Product[];
}
