import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsString()
  originalURL: string;

  @IsString()
  customAlias: string;

}
