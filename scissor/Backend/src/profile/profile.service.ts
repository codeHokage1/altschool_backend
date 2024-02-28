import { Injectable } from '@nestjs/common';
// import { CreateProfileDto } from './dto/create-profile.dto';
// import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // create(createProfileDto: CreateProfileDto) {
  //   return 'This action adds a new profile';
  // }

  // findAll() {
  //   return `This action returns all profile`;
  // }

  async findProfile(req: any) {
    const loggedInUser = req.user;
    // return loggedInUser;
    const foundUser = await this.userModel.findOne({
      _id: loggedInUser.sub,
    });
    return {
      message: 'Your profile details',
      data: foundUser,
    };
  }

  async update(updateAuthDto: UpdateAuthDto, req: any) {
    const loggedInUser = req.user;
    const updatedProfile = await this.userModel.findOneAndUpdate(
      { _id: loggedInUser.sub },
      updateAuthDto,
      { new: true },
    );

    return {
      message: 'Profile updated',
      data: updatedProfile,
    };
  }

  async remove(req: any) {
    const loggedInUser = req.user;
    await this.userModel.findOneAndDelete({ _id: loggedInUser.sub });
    return {
      message: 'Profile deleted',
      data: null,
    };
  }
}
