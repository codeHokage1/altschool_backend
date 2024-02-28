import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Post()
  // create(@Body() createProfileDto: CreateProfileDto) {
  //   return this.profileService.create(createProfileDto);
  // }

  // @Get()
  // findAll() {
  //   return this.profileService.findAll();
  // }

  @Get()
  findProfile(@Req() req: Request) {
    return this.profileService.findProfile(req);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.profileService.findOne(+id);
  // }

  @Patch()
  update(@Body() updateAuthDto: UpdateAuthDto, @Req() req: Request) {
    return this.profileService.update(updateAuthDto, req);
  }

  @Delete()
  remove(@Req() req: Request) {
    return this.profileService.remove(req);
  }
}
