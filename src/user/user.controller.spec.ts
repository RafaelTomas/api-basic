import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockReturnValue({ id: 1, name: 'João', email: 'joao@exemplo.com', age: 30 }),
            findAll: jest.fn().mockReturnValue([{ id: 1, name: 'João', email: 'joao@exemplo.com', age: 30 }]),
            findOne: jest.fn().mockReturnValue({ id: 1, name: 'João', email: 'joao@exemplo.com', age: 30 }),
            update: jest.fn().mockReturnValue({ id: 1, name: 'Carlos', email: 'carlos@exemplo.com', age: 35 }),
            remove: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await controller.create({
      name: 'João', email: 'joao@exemplo.com', age: 30,
      id: 1
    });
    expect(user.name).toBe('João');
  });

  it('should return all users', async () => {
    const users = await controller.findAll();
    expect(users).toHaveLength(1);
  });

  it('should return a user by id', async () => {
    const user = await controller.findOne(1);
    expect(user.name).toBe('João');
  });

  it('should update a user', async () => {
    const user = await controller.update(1, {
      name: 'Carlos', email: 'carlos@exemplo.com', age: 35,
      id: 1
    });
    expect(user.name).toBe('Carlos');
  });

  it('should delete a user', async () => {
    const result = await controller.remove(1);
    expect(result).toBe(true);
  });
});