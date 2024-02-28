import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
// import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ytid } from 'ytid';
import * as validURL from 'valid-url';
// import normalizeUrl from 'normalize-url';
// import * as url from 'url';
import * as QRCode from 'qrcode';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(Link.name) private readonly linkModel: Model<Link>,
  ) {}

  // refineUrl(url: string) {
  //   return normalizeUrl(url);
  // }

  async create(req: any, createLinkDto: CreateLinkDto) {
    // createLinkDto.originalURL = normalizeUrl(createLinkDto.originalURL);
    // const parsedURL = url.parse(createLinkDto.originalURL);
    // createLinkDto.originalURL = url.format({
    //   protocol: 'https',
    //   hostname: parsedURL.hostname,
    //   pathname: parsedURL.pathname,
    //   search: parsedURL.search,
    //   port: parsedURL.port,
    // });

    // console.log(createLinkDto.originalURL);
    // createLinkDto.originalURL = this.refineUrl(createLinkDto.originalURL);
    // console.log(createLinkDto.originalURL);

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

    // const qrCodeURL = await qrCode.to(URLPath);
    const qrCodeURL = await QRCode.toDataURL(URLPath);
    // await QRCode.toDataURL(URLPath, (err, url) => {
    //   if (err) {
    //     throw new BadRequestException(
    //       'An error occurred while generating QR code',
    //     );
    //   }
    //   console.log(url);
    // });

    const newLink = new this.linkModel({
      ...createLinkDto,
      userID: loggedInUser.sub,
      scissorURL: URLPath,
      QRCode: qrCodeURL
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

    // return `This action returns all links for user: ${JSON.stringify(req.user)}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  // update(id: number, updateLinkDto: UpdateLinkDto) {
  //   return `This action updates a #${id} link`;
  // }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
