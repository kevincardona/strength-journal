import * as bcrypt from 'bcrypt';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async register(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashed_password = await bcrypt.hash(password, 10);
    const id = await this.usersService.register(firstName, lastName, email, hashed_password);
    return { id: id };
  }

  @Get(':id')
  getAllUsers(
    @Param() param: { id: string },
  ) {
    return this.usersService.findOne(param.id);
  }
}
