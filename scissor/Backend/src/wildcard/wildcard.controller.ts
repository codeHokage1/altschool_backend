import { Controller, Get, Param, Res } from '@nestjs/common';
import { WildcardService } from './wildcard.service';
import { Response } from 'express';

@Controller()
export class WildcardController {
  constructor(private readonly wildcardService: WildcardService) {}

  @Get('/:scissorPath')
  redirectURL(@Param('scissorPath') scissorPath: string, @Res() res: Response) {
    return this.wildcardService.redirectURL(scissorPath, res);
  }

}
