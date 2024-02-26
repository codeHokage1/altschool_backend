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

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(Link.name) private readonly linkModel: Model<Link>,
  ) {}

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

    const loggedInUser = req.user;
    if (!validURL.isUri(createLinkDto.originalURL)) {
      return new BadRequestException(
        'This URL is invalid. Kindly check and try again.',
        { cause: new Error(), description: 'Some error description' },
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

    const newLink = new this.linkModel({
      ...createLinkDto,
      userID: loggedInUser.sub,
      scissorURL: URLPath,
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
