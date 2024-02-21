import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const newUser = await new this.userModel(createAuthDto);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();

    return {
      message: 'User created',
      data: newUser,
    };
  }

  async login(loginDto: LoginDto) {
    const foundUser = await this.userModel.findOne({ email: loginDto.email });
    if (!foundUser) {
      throw new NotFoundException(
        `No account has been created with ${loginDto.email}. Please register.`,
      );
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      foundUser.password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password. Please try again.');
    }

    return {
      message: 'Login successful',
      data: foundUser,
    };
  }
}
