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
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { User } from 'src/auth/entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    create(createAuthDto: CreateAuthDto): Promise<{
        message: string;
        data: {
            user: {
                name: string;
                email: string;
                createdAt: Date;
                proflePicURL: string;
                _id: import("mongoose").Types.ObjectId;
            };
            token: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        data: {
            user: {
                name: string;
                email: string;
                createdAt: Date;
                proflePicURL: string;
                _id: import("mongoose").Types.ObjectId;
            };
            token: string;
        };
    }>;
}
