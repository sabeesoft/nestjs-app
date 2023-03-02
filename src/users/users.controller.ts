import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Post()
  login(@Body() createUserDto: Omit<CreateUserDto, "name">) {
    return this.usersService.login(createUserDto);
  }

  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Get(':id')
  getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(+id);
  }

  @Patch(':id')
  updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
