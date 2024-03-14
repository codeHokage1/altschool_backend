/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { BadRequestException, HttpException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';
import { Model } from 'mongoose';
export declare class LinksService {
    private readonly linkModel;
    constructor(linkModel: Model<Link>);
    create(req: any, createLinkDto: CreateLinkDto): Promise<BadRequestException | {
        message: string;
        data: import("mongoose").Document<unknown, {}, Link> & Link & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findAll(req: any): Promise<{
        message: string;
        data: (import("mongoose").Document<unknown, {}, Link> & Link & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    findOne(id: string, req: any): Promise<HttpException | {
        message: string;
        data: import("mongoose").Document<unknown, {}, Link> & Link & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    update(id: string, updateLinkDto: UpdateLinkDto, req: any): Promise<HttpException | {
        message: string;
        data: import("mongoose").Document<unknown, {}, Link> & Link & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    remove(id: string, req: any): Promise<HttpException | {
        message: string;
        data: any;
    }>;
}
