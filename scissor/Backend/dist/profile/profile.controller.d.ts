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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ProfileService } from './profile.service';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { Request } from 'express';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    findProfile(req: Request): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../auth/entities/user.entity").User> & import("../auth/entities/user.entity").User & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    update(updateAuthDto: UpdateAuthDto, req: Request): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../auth/entities/user.entity").User> & import("../auth/entities/user.entity").User & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    remove(req: Request): Promise<{
        message: string;
        data: any;
    }>;
}
