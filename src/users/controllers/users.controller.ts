import { ParseIntPipe } from './../../common/parse-int.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUsersDto, UpdateUsersDto } from '../dtos/Users.dto';
import { UsersService } from '../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers() {
    const users = this.usersService.findAll();

    return {
      message: 'Users listed',
      body: users,
    };
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.findOne(id);

    return {
      message: `User with id: ${id} listed`,
      body: user,
    };
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    const userOrders = this.usersService.getOrdersByUser(id);

    return {
      message: `Orders from user #${id} listed`,
      body: userOrders,
    };
  }

  @Post()
  createUser(@Body() payload: CreateUsersDto) {
    const userCreated = this.usersService.create(payload);

    return {
      message: `Created user with id: ${userCreated.id}`,
      body: userCreated,
    };
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUsersDto,
  ) {
    const updatedUser = this.usersService.update(id, payload);

    return {
      message: `Updated user with id: ${id}`,
      body: updatedUser,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    this.usersService.delete(id);

    return {
      message: `Deleted user with id: ${id}`,
    };
  }
}
