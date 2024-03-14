"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async create(createAuthDto) {
        const foundUser = await this.userModel.findOne({ email: createAuthDto.email });
        if (foundUser) {
            throw new common_1.BadRequestException(`An account has already been created with ${createAuthDto.email}. Please login.`);
        }
        const newUser = await new this.userModel(createAuthDto);
        newUser.password = await bcrypt.hash(newUser.password, 10);
        await newUser.save();
        const { password, ...user } = newUser.toJSON();
        const payload = { sub: newUser._id, name: newUser.name };
        const token = await this.jwtService.signAsync(payload);
        return {
            message: 'User created',
            data: {
                user: user,
                token,
            },
        };
    }
    async login(loginDto) {
        const foundUser = await this.userModel.findOne({ email: loginDto.email });
        if (!foundUser) {
            throw new common_1.NotFoundException(`No account has been created with ${loginDto.email}. Please register.`);
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, foundUser.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password. Please try again.');
        }
        const { password, ...user } = foundUser.toJSON();
        const payload = { sub: foundUser._id, name: foundUser.name };
        const token = await this.jwtService.signAsync(payload);
        return {
            message: 'Login successful',
            data: {
                user: user,
                token,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map