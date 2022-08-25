import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from 'users/user.schema';
import { LoginDto } from './dtos/login.dto';
import { Iuser } from 'users/types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async login({ email, password }: LoginDto) {
    const payload = (await this.userModel.findOne({
      email: { $eq: email },
    })) as Iuser;
    const isMatch = await bcrypt.compare(password, payload.password);

    if (!isMatch)
      throw new HttpException(
        'Email or password is/are incorrect',
        HttpStatus.FORBIDDEN,
      );

    return {
      jwt: this.jwtService.sign({ payload }),
      user: payload,
    };
  }
}
