import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { faker } from '@faker-js/faker';

interface RandomUserData {
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
    problems: boolean;
}

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
    const data = [];
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 100_000; j++) {
            const randomData = this.randomUser();
            data.push({
                firstName: randomData.firstName,
                lastName: randomData.lastName,
                age: randomData.age,
                sex: randomData.sex,
                problems: randomData.problems
            });
        }
        console.log(`${i * 100_000} instances of random user data generated`);
    }
    await this.user.bulkCreate(data);
    console.log(`${data.length} database entries were generated`);
  }

  async clearDb() {
    await this.user.destroy({ truncate: true });
  }

  randomUser(): RandomUserData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: Math.floor(Math.round(Math.random() * 100)),
      sex: this.randomSex(),
      problems: this.randomProblems()
    };
  }

  randomSex(): string {
    return Math.random() > 0.5 ? 'male' : 'female';
  }

  randomProblems(): boolean {
    return Math.random() > 0.5;
  }
}
