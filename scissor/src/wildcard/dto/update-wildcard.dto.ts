import { PartialType } from '@nestjs/mapped-types';
import { CreateWildcardDto } from './create-wildcard.dto';

export class UpdateWildcardDto extends PartialType(CreateWildcardDto) {}
