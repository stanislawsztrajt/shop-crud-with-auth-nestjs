import { Controller, Get, Param } from '@nestjs/common';
import { User } from './user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]>{
    return this.usersService.getAll()
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id)
  }
}
