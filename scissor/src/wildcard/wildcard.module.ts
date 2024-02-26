import { Module } from '@nestjs/common';
import { WildcardService } from './wildcard.service';
import { WildcardController } from './wildcard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkSchema } from 'src/links/entities/link.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([{ name: 'Link', schema: LinkSchema }]),
  ],
  controllers: [WildcardController],
  providers: [WildcardService],
})
export class WildcardModule {}
