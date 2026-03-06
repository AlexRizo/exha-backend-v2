import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth('admin')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Auth()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Auth()
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.userService.findOne(term);
  }
}
