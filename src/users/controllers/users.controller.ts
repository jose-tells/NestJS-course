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
import { CreateUsersDto, UpdateUsersDto } from '../dtos/users.dto';
import { UsersService } from '../services/users/users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all users' })
  async getUsers() {
    const users = await this.usersService.findAll();

    return {
      message: 'Users listed',
      body: users,
    };
  }

  @Get(':id')
  async getUserById(@Param('id', MongoIdPipe) id: string) {
    const user = await this.usersService.findOne(id);

    return {
      message: `User listed with id: ${id} `,
      body: user,
    };
  }

  // @Get(':id/orders')
  // getOrders(@Param('id', ParseIntPipe) id: number) {
  //   const userOrders = this.usersService.getOrdersByUser(id);

  //   return {
  //     message: `Orders from user #${id} listed`,
  //     body: userOrders,
  //   };
  // }

  @Post()
  async createUser(@Body() payload: CreateUsersDto) {
    const userCreated = await this.usersService.create(payload);

    return {
      message: `Created user with id: ${userCreated._id}`,
      body: userCreated,
    };
  }

  @Put(':id')
  async updateUser(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateUsersDto,
  ) {
    const updatedUser = await this.usersService.update(id, payload);

    return {
      message: `Updated user with id: ${id}`,
      body: updatedUser,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id', MongoIdPipe) id: string) {
    const userDeleted = await this.usersService.delete(id);

    return {
      message: `Deleted user with id: ${id}`,
      body: userDeleted,
    };
  }
}
