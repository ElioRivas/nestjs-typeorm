import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { PrimaryGeneratedColumn, Entity, Column} from 'typeorm';


@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'date'})
  date: Date;

  user: User;
  products: Product[];
}
