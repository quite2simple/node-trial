import { Controller, Delete, Get, Post } from '@nestjs/common';
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

    @Delete('clear')
    async clearDb() {
        await this.userService.clearDb();
        return 'Cleared';
    }
}
