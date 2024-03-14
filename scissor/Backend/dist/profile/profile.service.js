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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../auth/entities/user.entity");
const mongoose_2 = require("mongoose");
let ProfileService = class ProfileService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findProfile(req) {
        const loggedInUser = req.user;
        const foundUser = await this.userModel.findOne({
            _id: loggedInUser.sub,
        });
        return {
            message: 'Your profile details',
            data: foundUser,
        };
    }
    async update(updateAuthDto, req) {
        const loggedInUser = req.user;
        const updatedProfile = await this.userModel.findOneAndUpdate({ _id: loggedInUser.sub }, updateAuthDto, { new: true });
        return {
            message: 'Profile updated',
            data: updatedProfile,
        };
    }
    async remove(req) {
        const loggedInUser = req.user;
        await this.userModel.findOneAndDelete({ _id: loggedInUser.sub });
        return {
            message: 'Profile deleted',
            data: null,
        };
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProfileService);
//# sourceMappingURL=profile.service.js.map