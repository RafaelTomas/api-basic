import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: User): User {
    return this.usersService.create(user.name, user.email, user.age);
  }
  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): User | undefined {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() user: User,
  ): User | undefined {
    return this.usersService.update(id, user.name, user.email, user.age);
  }
  @Delete(':id')
  remove(@Param('id') id: number): boolean {
    return this.usersService.remove(id);
  }
}
