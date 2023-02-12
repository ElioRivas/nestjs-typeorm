import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {Client} from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { Product } from './../../products/entities/product.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    //private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      where: { id: id },
    });
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);

  }

  remove(id: number) {
    const user = this.userRepo.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return this.userRepo.delete(id);
  }

  async getOrderByUser(id: number) {
    const user = await this.userRepo.findOne({
      where: { id: id },
    });
    return {
      date: new Date(),
      user,
      products: await this.productRepo.find(),
    };
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }

  }


