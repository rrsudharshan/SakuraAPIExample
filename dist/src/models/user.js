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
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@sakuraapi/api");
exports.SakuraApi = api_1.SakuraApi;
const mongodb_1 = require("mongodb");
exports.Cursor = mongodb_1.Cursor;
exports.MongoDb = mongodb_1.Db;
exports.ObjectID = mongodb_1.ObjectID;
const db_1 = require("../config/bootstrap/db");
let User = class User extends api_1.SapiModelMixin() {
};
__decorate([
    api_1.Db({ field: 'name' }), api_1.Json(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
User = __decorate([
    api_1.Model({
        dbConfig: db_1.dbs.user
    })
], User);
exports.User = User;
//# sourceMappingURL=user.js.map