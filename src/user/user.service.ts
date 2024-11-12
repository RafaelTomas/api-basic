import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'João', email: 'joao@exemplo.com', age: 30 },
    { id: 2, name: 'Maria', email: 'maria@exemplo.com', age: 25 },
  ];

  create(name: string, email: string, age: number): User {
    const newUser: User = {
      id: this.users.length + 1, 
      name,
      email,
      age,
    };
    this.users.push(newUser);
    return newUser;
  }

 
  findAll(): User[] {
    return this.users;
  }


  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }


  update(id: number, name: string, email: string, age: number): User | undefined {
    const user = this.findOne(id);
    if (user) {
      user.name = name;
      user.email = email;
      user.age = age;
    }
    return user;
  }


  remove(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
