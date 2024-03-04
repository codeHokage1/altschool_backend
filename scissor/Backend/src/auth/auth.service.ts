import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const foundUser = await this.userModel.findOne({ email: createAuthDto.email });
    if (foundUser) {
      throw new BadRequestException(
        `An account has already been created with ${createAuthDto.email}. Please login.`,
      );
    }
    const newUser = await new this.userModel(createAuthDto);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...user} = newUser.toJSON();

    const payload = { sub: newUser._id, name: newUser.name };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'User created',
      data: {
        user: user,
        token,
      },
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
      // throw new NotFoundException('Invalid password. Please try again.');
      throw new UnauthorizedException('Invalid password. Please try again.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...user} = foundUser.toJSON();

    const payload = { sub: foundUser._id, name: foundUser.name };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      data: {
        user: user,
        token,
      },
    };
  }
}
