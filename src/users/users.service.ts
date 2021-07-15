import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 'john',
      password: 'changeme',
    },
    {
      id: 'maria',
      password: 'guess',
    },
  ];

  async findOne(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
}