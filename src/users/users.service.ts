import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  create(dto: CreateUserDto): User {
    const newUser: User = {
      id: this.nextId++,
      name: dto.name,
      email: dto.email,
      password: dto.password,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const found = this.users.find((u) => u.id === id);
    if (!found) throw new NotFoundException(`User ${id} no existe`);
    return found;
  }

  update(id: number, dto: UpdateUserDto): User {
    const user = this.findOne(id);
    Object.assign(user, dto);
    return user;
  }

  remove(id: number): void {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException(`User ${id} no existe`);
    this.users.splice(idx, 1);
  }
}
