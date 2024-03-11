import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsUrl()
  originalURL: string;

  @IsString()
  customAlias: string;

  @IsString()
  description?: string;

}
