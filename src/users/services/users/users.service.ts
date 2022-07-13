import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto, UpdateUsersDto } from 'src/users/dtos/Users.dto';
import { Users } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}

  private counterId = 123;

  private users: Users[] = [
    {
      id: 123,
      name: 'Jose Marquinez',
      email: 'josemarquinez28@gmail.com',
      password: '12345678',
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }

  create(payload: CreateUsersDto) {
    this.counterId = this.counterId + 1;

    const newUser = {
      id: this.counterId,
      ...payload,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, payload: UpdateUsersDto) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    const index = this.users.findIndex((item) => item.id === id);

    this.users[index] = {
      ...user,
      ...payload,
    };

    return this.users[index];
  }

  delete(id: number) {
    const index = this.users.findIndex((index) => index.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    this.users.splice(index, 1);

    return true;
  }

  getOrdersByUser(id: number) {
    const user = this.findOne(id);

    return {
      date: new Date(),
      products: this.productsService.findAll(),
      user,
    };
  }
}
