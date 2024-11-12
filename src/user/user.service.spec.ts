import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    const user = service.create('João', 'joao@exemplo.com', 30);
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('João');
  });

  it('should find all users', () => {
    service.create('João', 'joao@exemplo.com', 30);
    const users = service.findAll();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should find a user by id', () => {
    const user = service.create('Maria', 'maria@exemplo.com', 25);
    const foundUser = service.findOne(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser.name).toBe('Maria');
  });

  it('should update a user', () => {
    const user = service.create('Carlos', 'carlos@exemplo.com', 30);
    const updatedUser = service.update(user.id, 'Carlos Updated', 'carlos_updated@exemplo.com', 31);
    expect(updatedUser.name).toBe('Carlos Updated');
  });

  it('should delete a user', () => {
    const user = service.create('João', 'joao@exemplo.com', 30);
    const deleted = service.remove(user.id);
    expect(deleted).toBe(true);
  });
});
