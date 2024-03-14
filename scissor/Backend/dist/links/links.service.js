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
exports.LinksService = void 0;
const common_1 = require("@nestjs/common");
const link_entity_1 = require("./entities/link.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ytid_1 = require("ytid");
const validURL = require("valid-url");
const QRCode = require("qrcode");
let LinksService = class LinksService {
    constructor(linkModel) {
        this.linkModel = linkModel;
    }
    async create(req, createLinkDto) {
        const loggedInUser = req.user;
        if (createLinkDto.customAlias) {
            const existingLink = await this.linkModel.findOne({
                customAlias: createLinkDto.customAlias,
            });
            if (existingLink) {
                return new common_1.BadRequestException('This alias is already in use. Kindly choose another one.');
            }
        }
        const foundLink = await this.linkModel.findOne({
            originalURL: createLinkDto.originalURL,
            userID: loggedInUser.sub
        });
        if (foundLink) {
            return new common_1.BadRequestException('You already shortened this URL. Kindly check your dashboard for the link.');
        }
        if (!validURL.isUri(createLinkDto.originalURL)) {
            return new common_1.BadRequestException('This URL is invalid. Kindly check and try again. Also ensure that your URL is in the form: http://www.example.com or https://www.example.com.');
        }
        let URLPath = '';
        if (createLinkDto.customAlias) {
            URLPath = `${process.env.baseURL}/${createLinkDto.customAlias}`;
        }
        else {
            URLPath = `${process.env.baseURL}/${(0, ytid_1.ytid)()}`;
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
    async findAll(req) {
        const loggedInUser = req.user;
        const userLinks = await this.linkModel.find({ userID: loggedInUser.sub });
        return {
            message: 'All your links',
            data: userLinks,
        };
    }
    async findOne(id, req) {
        try {
            const loggedInUser = req.user;
            const foundLink = await this.linkModel.findOne({
                _id: id,
                userID: loggedInUser.sub,
            });
            if (!foundLink) {
                return new common_1.NotFoundException(`You don't have a link with the ID: ${id}`);
            }
            return {
                message: 'Your link',
                data: foundLink,
            };
        }
        catch (error) {
            if (error.message.includes('Cast to ObjectId failed for value')) {
                return new common_1.HttpException('Your link ID is invalid. Kindly check and try again.', 400);
            }
            return new common_1.HttpException(error, 500);
        }
    }
    async update(id, updateLinkDto, req) {
        try {
            const loggedInUser = req.user;
            const foundLink = await this.linkModel.findOne({
                _id: id,
                userID: loggedInUser.sub,
            });
            if (!foundLink) {
                return new common_1.NotFoundException(`You don't have a link with the ID: ${id}`);
            }
            if (updateLinkDto.customAlias) {
                const foundLinkWithAlias = await this.linkModel.findOne({
                    customAlias: updateLinkDto.customAlias,
                });
                if (foundLinkWithAlias) {
                    return new common_1.BadRequestException('This alias is already in use. Kindly choose another one.');
                }
            }
            const updatedLink = await this.linkModel.findByIdAndUpdate({ _id: id }, {
                ...updateLinkDto,
                scissorURL: `${process.env.baseURL}/${updateLinkDto.customAlias}`,
            }, {
                new: true,
            });
            return {
                message: 'Your link has been updated',
                data: updatedLink,
            };
        }
        catch (error) {
            if (error.message.includes('Cast to ObjectId failed for value')) {
                return new common_1.HttpException('Your link ID is invalid. Kindly check and try again.', 400);
            }
            return new common_1.HttpException(error, 500);
        }
    }
    async remove(id, req) {
        try {
            const loggedInUser = req.user;
            const foundLink = await this.linkModel.findOne({
                _id: id,
                userID: loggedInUser.sub,
            });
            if (!foundLink) {
                return new common_1.NotFoundException(`You don't have a link with the ID: ${id}`);
            }
            await this.linkModel.deleteOne({ _id: id });
            return {
                message: 'Your link has been deleted',
                data: null,
            };
        }
        catch (error) {
            if (error.message.includes('Cast to ObjectId failed for value')) {
                return new common_1.HttpException('Your link ID is invalid. Kindly check and try again.', 400);
            }
            return new common_1.HttpException(error, 500);
        }
    }
};
exports.LinksService = LinksService;
exports.LinksService = LinksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(link_entity_1.Link.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LinksService);
//# sourceMappingURL=links.service.js.map