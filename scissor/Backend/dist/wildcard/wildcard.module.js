"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WildcardModule = void 0;
const common_1 = require("@nestjs/common");
const wildcard_service_1 = require("./wildcard.service");
const wildcard_controller_1 = require("./wildcard.controller");
const mongoose_1 = require("@nestjs/mongoose");
const link_entity_1 = require("../links/entities/link.entity");
const config_1 = require("@nestjs/config");
let WildcardModule = class WildcardModule {
};
exports.WildcardModule = WildcardModule;
exports.WildcardModule = WildcardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Link', schema: link_entity_1.LinkSchema }]),
        ],
        controllers: [wildcard_controller_1.WildcardController],
        providers: [wildcard_service_1.WildcardService],
    })
], WildcardModule);
//# sourceMappingURL=wildcard.module.js.map