import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {

  }

  findAll() {
    return this.userRepository.find()
  }

  register(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto
    });
    return this.userRepository.save(user)
  }

  login(createUserDto: Omit<CreateUserDto, "name">) {
    throw new Error("Not implemented");
  }

  getProfile(id: number) {
    throw new Error("Not implemented");
  }

  updateProfile(id: number, updateUserDto: UpdateUserDto) {
    throw new Error("Not implemented");
  }

  remove(id: number) {
    throw new Error("Not implemented");
  }
}
