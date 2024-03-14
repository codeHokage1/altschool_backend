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
exports.WildcardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const link_entity_1 = require("../links/entities/link.entity");
let WildcardService = class WildcardService {
    constructor(linkModel) {
        this.linkModel = linkModel;
    }
    async redirectURL(scissorPath, res) {
        try {
            const foundLink = await this.linkModel.findOne({
                scissorURL: `${process.env.baseURL}/${scissorPath}`,
            });
            if (!foundLink) {
                return res.status(404).json({
                    message: 'Link not found!',
                    data: null,
                });
            }
            foundLink.analytics.engagements++;
            await foundLink.save();
            return res.redirect(foundLink.originalURL);
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
                data: null,
            });
        }
    }
};
exports.WildcardService = WildcardService;
exports.WildcardService = WildcardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(link_entity_1.Link.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WildcardService);
//# sourceMappingURL=wildcard.service.js.map