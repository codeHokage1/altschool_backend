import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ytid } from 'ytid';
import * as validURL from 'valid-url';
import * as QRCode from 'qrcode';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(Link.name) private readonly linkModel: Model<Link>,
  ) {}

  async create(req: any, createLinkDto: CreateLinkDto) {
    const loggedInUser = req.user;
    if (createLinkDto.customAlias) {
      const existingLink = await this.linkModel.findOne({
        customAlias: createLinkDto.customAlias,
      });
      if (existingLink) {
        return new BadRequestException(
          'This alias is already in use. Kindly choose another one.',
        );
      }
    }

    const foundLink = await this.linkModel.findOne({
      originalURL: createLinkDto.originalURL,
      userID: loggedInUser.sub
    });
    if (foundLink) {
      return new BadRequestException(
        'You already shortened this URL. Kindly check your dashboard for the link.',
      );
    }

    if (!validURL.isUri(createLinkDto.originalURL)) {
      return new BadRequestException(
        'This URL is invalid. Kindly check and try again. Also ensure that your URL is in the form: http://www.example.com or https://www.example.com.',
      );
      // return new HttpException('This URL is invalid. Kindly check and try again.', HttpStatus.BAD_REQUEST)
    }

    let URLPath: string = '';
    if (createLinkDto.customAlias) {
      URLPath = `${process.env.baseURL}/${createLinkDto.customAlias}`;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      URLPath = `${process.env.baseURL}/${ytid()}`;
    }

    const qrCodeURL = await QRCode.toDataURL(URLPath);

    const newLink = new this.linkModel({
      ...createLinkDto,
      userID: loggedInUser.sub,
      scissorURL: URLPath,
      QRCode: qrCodeURL,
      description: createLinkDto.description ? createLinkDto.description : "Untitled Link",
    });
    await newLink.save();

    return {
      message: 'Link shortened!',
      data: newLink,
    };
  }

  async findAll(req: any) {
    const loggedInUser = req.user;
    const userLinks = await this.linkModel.find({ userID: loggedInUser.sub });

    return {
      message: 'All your links',
      data: userLinks,
    };
  }

  async findOne(id: string, req: any) {
    try {
      const loggedInUser = req.user;
      const foundLink = await this.linkModel.findOne({
        _id: id,
        userID: loggedInUser.sub,
      });
      if (!foundLink) {
        return new NotFoundException(
          `You don't have a link with the ID: ${id}`,
        );
      }
      return {
        message: 'Your link',
        data: foundLink,
      };
    } catch (error) {
      if (error.message.includes('Cast to ObjectId failed for value')) {
        return new HttpException(
          'Your link ID is invalid. Kindly check and try again.',
          400,
        );
      }
      return new HttpException(error, 500);
    }
  }

  async update(id: string, updateLinkDto: UpdateLinkDto, req: any) {
    try {
      const loggedInUser = req.user;
      const foundLink = await this.linkModel.findOne({
        _id: id,
        userID: loggedInUser.sub,
      });
      if (!foundLink) {
        return new NotFoundException(
          `You don't have a link with the ID: ${id}`,
        );
      }

      if (updateLinkDto.customAlias) {
        const foundLinkWithAlias = await this.linkModel.findOne({
          customAlias: updateLinkDto.customAlias,
        });
        if (foundLinkWithAlias) {
          return new BadRequestException(
            'This alias is already in use. Kindly choose another one.',
          );
        }
      }

      const updatedLink = await this.linkModel.findByIdAndUpdate(
        { _id: id },
        {
          ...updateLinkDto,
          scissorURL: `${process.env.baseURL}/${updateLinkDto.customAlias}`,
        },
        {
          new: true,
        },
      );

      return {
        message: 'Your link has been updated',
        data: updatedLink,
      };
    } catch (error) {
      if (error.message.includes('Cast to ObjectId failed for value')) {
        return new HttpException(
          'Your link ID is invalid. Kindly check and try again.',
          400,
        );
      }
      return new HttpException(error, 500);
    }
  }

  async remove(id: string, req: any) {
    try {
      const loggedInUser = req.user;
      const foundLink = await this.linkModel.findOne({
        _id: id,
        userID: loggedInUser.sub,
      });
      if (!foundLink) {
        return new NotFoundException(
          `You don't have a link with the ID: ${id}`,
        );
      }

      await this.linkModel.deleteOne({ _id: id });

      return {
        message: 'Your link has been deleted',
        data: null,
      };
      
    } catch (error) {
      if (error.message.includes('Cast to ObjectId failed for value')) {
        return new HttpException(
          'Your link ID is invalid. Kindly check and try again.',
          400,
        );
      }
      return new HttpException(error, 500);
    }
  }
}
