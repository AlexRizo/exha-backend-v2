import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

    const validPass = compareSync(password, user.password);

    if (!validPass) {
      return null;
    }

    return user;
  }
}
