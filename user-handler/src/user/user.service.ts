import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly user: typeof User
  ) {}

  async countAll(): Promise<number> {
    return this.user.count();
  }

  async populateDb() {

  }
}
