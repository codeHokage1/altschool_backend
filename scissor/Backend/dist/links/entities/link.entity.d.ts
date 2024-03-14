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
import * as mongoose from 'mongoose';
export declare class Link {
    userID: mongoose.Schema.Types.ObjectId;
    originalURL: string;
    scissorURL: string;
    customAlias: string;
    description: string;
    analytics: Record<string, any>;
    QRCode: string;
    createdAt: Date;
    expirationDate: Date;
}
export declare const LinkSchema: mongoose.Schema<Link, mongoose.Model<Link, any, any, any, mongoose.Document<unknown, any, Link> & Link & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Link, mongoose.Document<unknown, {}, mongoose.FlatRecord<Link>> & mongoose.FlatRecord<Link> & {
    _id: mongoose.Types.ObjectId;
}>;
