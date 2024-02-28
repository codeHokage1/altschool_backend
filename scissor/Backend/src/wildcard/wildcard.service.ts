import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Link } from 'src/links/entities/link.entity';

@Injectable()
export class WildcardService {
  constructor(
    @InjectModel(Link.name) private readonly linkModel: Model<Link>,
  ) {}

  async redirectURL(scissorPath: string, res: any) {
    try {
      const foundLink = await this.linkModel.findOne({
        scissorURL: `${process.env.baseURL}/${scissorPath}`,
      });
      if (!foundLink) {
        return res.status(404).json({
          message: 'Link not found!',
          data: null,
        });
      }

      foundLink.analytics.engagements++;
      await foundLink.save();

      return res.redirect(foundLink.originalURL);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        data: null,
      });
    }
  }
}
