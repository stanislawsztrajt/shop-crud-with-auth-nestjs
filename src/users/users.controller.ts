import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { parseResponse } from 'helpers';
import { CreateUserDto } from './dtos/create-user.dto';
import { Iuser, SerializedUser } from './types';
import { User } from './user.schema';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    const users = await this.usersService.getAll()
    const serializedUsers = users.map((user: Iuser) => new SerializedUser(parseResponse(user)))
    return serializedUsers
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getById(id);
    return new SerializedUser(parseResponse(user))
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)

    return new SerializedUser(parseResponse(user))
  }
}
