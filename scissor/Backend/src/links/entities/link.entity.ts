import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { User } from 'src/auth/entities/user.entity';
@Schema()
export class Link {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userID: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  originalURL: string;

  @Prop({ required: true })
  scissorURL: string;

  @Prop({ default: ''})
  customAlias: string;

  @Prop(
    raw({
      engagements: { type: Number, default: 0 },
      locations: { type: [String], default: [] },
    }),
  )
  analytics: Record<string, any>;

  @Prop({ default: '' })
  QRCode: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  expirationDate: Date;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
