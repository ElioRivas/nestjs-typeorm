import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ){}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne({
      where: { id: id },
      relations:['products'],
    });
    if(!brand){
      throw new NotFoundException(`Could not find ${id} `);
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne({
      where:{ id: id},
    });
    this.brandRepo.merge(brand,changes);
    return this.brandRepo.save(brand);
  }

  remove(id: number) {
    const brand = this.brandRepo.findOne({
      where : { id: id },
    });
    if(!brand){
      throw new NotFoundException(`Couldn not find ${id} brand`);
    }
    return this.brandRepo.delete(id);
  }
}
