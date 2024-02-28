import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Patch } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  create(@Body() createLinkDto: CreateLinkDto, @Request() req) {
    return this.linksService.create(req, createLinkDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.linksService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.linksService.findOne(id, req);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto, @Request() req){
    return this.linksService.update(id, updateLinkDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req){
    return this.linksService.remove(id, req);
  }
}
