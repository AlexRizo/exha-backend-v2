import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserRoleDto } from './dto/user-role.dto';

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
  findAll(@Query() query: UserRoleDto) {
    return this.userService.findAll(query);
  }

  @Auth()
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.userService.findOne(term);
  }
}
