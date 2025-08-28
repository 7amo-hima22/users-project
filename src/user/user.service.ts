/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user)
    private userRepository: Repository<user>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newuser =await this.userRepository.save(createUserDto);
    return newuser;
  }

  findAll() {
    const users=this.userRepository.find();
    return users;
  }

  findOne(id: number) {
    const user=this.userRepository.findOneBy({id});
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateduser=await this.userRepository.update(id,updateUserDto);
    return updateduser;
  }

  remove(id: number) {
    const deleteuser=this.userRepository.delete(id);
    return deleteuser;
  }

  async searchUsers(keyword: string) {
     if (!keyword) {
    throw new Error('Keyword is required');
  }
  return await this.userRepository
    .createQueryBuilder('user')
    .where('user.name LIKE :keyword', { keyword: `%${keyword}%` })
    .orWhere('user.email LIKE :keyword', { keyword: `%${keyword}%` })
    .orWhere('user.address LIKE :keyword', { keyword: `%${keyword}%` })
  
    .getMany();
}

}
