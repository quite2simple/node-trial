import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get('count')
    async countAll(): Promise<number> {
        return await this.userService.countAll();
    }

    @Post('populate')
    async populateDb() {
        await this.userService.populateDb();
        return 'Populated';
    }

    @Patch('problemMen')
    async problemMen() {
        await this.userService.problemMen();
        return 'Set problems to true for all men';
    }

    @Patch('problemWomen')
    async problemWomen() {
        await this.userService.problemWomen();
        return 'Set problems to true for all women';
    }

    @Patch('resolve')
    async resolveProblems() {
        return {problemCount: await this.userService.resolveProblems()};
    }

    @Delete('clear')
    async clearDb() {
        await this.userService.clearDb();
        return 'Cleared';
    }
}
